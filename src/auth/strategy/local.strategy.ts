import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.localValidateUser(email, password);
    if (!user) {
      return UnauthorizedException;
    }
    return user;
  }
}
