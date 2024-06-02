import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, Role } from '@prisma/client';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });
  }

  async signIn(email: string, _password: string): Promise<any> {
    const user = await this.findOne(email);
    if (!compareSync(_password, user.password)) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.tokenService.saveAccessToken({
      token: access_token,
      expiredAt: new Date(Date.now() + 1 * 3600 * 1000),
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    await this.tokenService.saveRefreshToken({
      token: refresh_token,
      expiredAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(
    email: string,
    _password: string,
    roles: Array<string>,
  ): Promise<User> {
    const passwordHash = hashSync(_password, 2);
    console.log('password is hashed', passwordHash);
    return this.prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        roles: {
          connectOrCreate: roles.map((role) => {
            return {
              where: { name: role },
              create: { name: role },
            };
          }),
        },
      },
    });
  }
}
