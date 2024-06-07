import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from '@prisma/client';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() signInDto: CreateUserDto): Promise<string> {
    return this.userService.signIn(signInDto.email, signInDto.password);
  }

  // @Post('create-superadmin')
  // createSuperAdmin(@Body() signUpDto: CreateUserDto): Promise<User> {
  //   return this.userService.signUp(
  //     signUpDto.email,
  //     signUpDto.password,
  //     Array.of('SUPERADMIN'),
  //   );
  // }


  @Post('refresh-token')
  refreshToken(@Body() signInDto: CreateUserDto): Promise<string> {
    return this.userService.signIn(signInDto.email, signInDto.password);
  }
  



  // @Post('signup')
  // signup(): string {
  //   return this.userService.getHello();
  // }

  // @Post('reset-password')
  // resetPassword(): string {
  //   return this.userService.getHello();
  // } my brnach
}



