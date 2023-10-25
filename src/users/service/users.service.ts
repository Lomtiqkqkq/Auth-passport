import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../model/user.model';
import { UpdateUserDto } from '../dto/updateUserDto';
import { CreateUserDto } from '../dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
  ) {}
  async createUser(createDto: CreateUserDto): Promise<UserModel> {
    const hashedPass = await bcrypt.hash(createDto.password, 10);
    return await this.userRepository.create({
      ...createDto,
      password: hashedPass,
    });
  }
  async updateUser(id: number, updateDto: UpdateUserDto) {
    return await this.userRepository.update(updateDto, { where: { id } });
  }
  async findById(id: number): Promise<UserModel> {
    return this.userRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<UserModel> {
    return this.userRepository.findOne({ where: { email } });
  }
}
