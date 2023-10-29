import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
type jwtPayload = {
  email: string;
  username: string;
  sub: number;
};
@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_AT_JWT'),
    });
  }
  async validate(payload: jwtPayload) {
    return payload;
  }
}
