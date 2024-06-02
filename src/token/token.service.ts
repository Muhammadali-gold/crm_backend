import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, AccessToken } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
) {}

  async saveAccessToken(
    data: Prisma.AccessTokenCreateInput,
  ): Promise<AccessToken> {
    return this.prisma.accessToken.create({
      data,
    });
  }

  async saveRefreshToken(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<AccessToken> {
    return this.prisma.refreshToken.create({
      data,
    });
  }
}
