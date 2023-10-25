import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigOptions } from './database/sequelize.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModel } from './users/model/user.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env',
    }),
    SequelizeModule.forRoot({
      ...SequelizeConfigOptions,
      models: [UserModel],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
