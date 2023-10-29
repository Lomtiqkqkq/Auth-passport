import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { AuthJwtGuard } from '../guard/auth-jwt.guard';
import { CreateUserDto } from '../../users/dto/createUserDto';
import { AuthGoogleGuard } from '../guard/auth-google.guard';
import { UsersService } from '../../users/service/users.service';
import { AuthYandexGuard } from '../guard/auth-yandex.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @UseGuards(AuthLocalGuard)
  @Post('login')
  logIn(@Body() logInDto: CreateUserDto) {
    return this.authService.localValidateUser(
      logInDto.email,
      logInDto.password,
    );
  }
  @UseGuards(AuthJwtGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findByEmail(req.user.email);
  }
  @UseGuards(AuthGoogleGuard)
  @Get('google')
  googleLogin() {
    //guard redirect
  }
  @UseGuards(AuthGoogleGuard)
  @Get('/google/callback')
  googleCallback(@Req() req) {
    return this.authService.passportValidateUser(req.user);
  }
  @UseGuards(AuthYandexGuard)
  @Get('yandex')
  yandexLogin() {
    //guard redirect
  }
  @UseGuards(AuthYandexGuard)
  @Get('/yandex/callback')
  yandexCallback(@Req() req) {
    return this.authService.passportValidateUser(req.user);
  }
}
