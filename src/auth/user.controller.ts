import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getHello(): string {
  //   return this.userService.getHello();
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
