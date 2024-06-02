import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [
    TokenModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [TokenService, UserService, PrismaService],
})
export class UserModule {}
