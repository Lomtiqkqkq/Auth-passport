import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/createUserDto';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }
  async login(email: string, password: string): Promise<string> {
    const validatedUser = await this.validateUser(email, password);
    return this.getTokens(validatedUser);
  }
  async getTokens(user: any) {
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };
    return this.jwtService.sign(
      { ...payload },
      { secret: process.env.SECRET_AT_JWT, expiresIn: 60 * 60 * 12 },
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
