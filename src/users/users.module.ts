import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';
import { UsersController } from './controller/users.controller';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
