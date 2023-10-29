import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import * as dotenv from 'dotenv';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessJwtStrategy } from './strategy/access-jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';
import { YandexStrategy } from './strategy/yandex.strategy';

dotenv.config();
@Module({
  providers: [
    AuthService,
    LocalStrategy,
    AccessJwtStrategy,
    GoogleStrategy,
    YandexStrategy,
  ],
  imports: [UsersModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
})
export class AuthModule {}
