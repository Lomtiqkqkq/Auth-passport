import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthJwtGuard } from '../guard/auth-jwt.guard';
import { CreateUserDto } from '../../users/dto/createUserDto';
import { AuthGoogleGuard } from '../guard/auth-google.guard';
import { UsersService } from '../../users/service/users.service';
import { AuthYandexGuard } from '../guard/auth-yandex.guard';
import { AuthFilter } from '../exception/auth.filter';
import { AuthGuard } from '../guard/auth.guard';

@UseFilters(AuthFilter)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Get('/registration')
  registration() {
    return 'registration page';
  }
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
  @UseGuards(AuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req) {
    return this.authService.passportValidateUser(req.user);
  }
  @UseGuards(AuthYandexGuard)
  @Get('yandex')
  yandexLogin() {
    //guard redirect
  }
  @UseGuards(AuthGuard)
  @Get('yandex/callback')
  yandexCallback(@Req() req) {
    return this.authService.passportValidateUser(req.user);
  }
}
