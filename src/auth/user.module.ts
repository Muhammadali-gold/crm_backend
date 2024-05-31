import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}