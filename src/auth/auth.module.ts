import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import * as dotenv from 'dotenv';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessJwtStrategy } from './strategy/access-jwt.strategy';

dotenv.config();
@Module({
  providers: [AuthService, LocalStrategy, AccessJwtStrategy],
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
})
export class AuthModule {}
