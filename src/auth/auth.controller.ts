import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('v1/auth/login')
  login(): string {
    return this.userService.getHello();
  }

  @Post('v1/auth/signup')
  signup(): string {
    return this.userService.getHello();
  }

  @Post('v1/auth/reset-password')
  resetPassword(): string {
    return this.userService.getHello();
  }
}
