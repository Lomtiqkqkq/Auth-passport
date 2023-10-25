import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { AuthJwtGuard } from '../guard/auth-jwt.guard';
import { CreateUserDto } from '../../users/dto/createUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthLocalGuard)
  @Post('login')
  logIn(@Body() logInDto: CreateUserDto) {
    return this.authService.login(logInDto.email, logInDto.password);
  }
  @UseGuards(AuthJwtGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
