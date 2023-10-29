import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/createUserDto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async localValidateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return this.getTokens(user);
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }
  async passportValidateUser(passportUser: any) {
    const candidate = await this.userService.findByEmail(passportUser.email);
    if (!candidate) {
      throw new HttpException('user does`t exist!', HttpStatus.NOT_FOUND);
    }
    return this.getTokens(candidate);
  }
  async getTokens(user: any) {
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };
    return this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('SECRET_AT_JWT'),
        expiresIn: 60 * 60 * 12,
      },
    );
  }
  async registration(createDto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(createDto.email);
    if (candidate) {
      throw new HttpException('email already exist!', HttpStatus.CONFLICT);
    }
    const newUser = await this.userService.createUser(createDto);
    return this.getTokens(newUser);
  }
}
