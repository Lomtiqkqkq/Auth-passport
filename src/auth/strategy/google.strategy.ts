import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { emails } = profile;
    return {
      email: emails[0].value,
    };
  }
  // async googleValidate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: Profile,
  // ) {
  //   const user = {
  //     email: profile.emails[0].value,
  //     username: profile.username,
  //     accessToken,
  //   };
  //   return user;
  // }
}
