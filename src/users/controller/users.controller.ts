import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/createUserDto';
import { UpdateUserDto } from '../dto/updateUserDto';

@Controller('test')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('create')
  createUser(@Body() createDto: CreateUserDto) {
    return this.usersService.createUser(createDto);
  }
  @Patch('update')
  updateUser(id: number, updateDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateDto);
  }
}
