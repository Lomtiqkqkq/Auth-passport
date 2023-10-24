import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigOptions } from './database/sequelize.config';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env',
    }),
    SequelizeModule.forRoot({
      ...SequelizeConfigOptions,
      models: [],
      autoLoadModels: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
