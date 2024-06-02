import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TokenService, PrismaService],
})
export class TokenModule {}
