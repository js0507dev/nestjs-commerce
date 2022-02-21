import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import * as config from '@src/config';
import { ConfigToken, DatabaseConfig } from '@src/config';
import { LoggerOption } from '@src/logger/logger-option';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config.commonConfig(), config.databaseConfig()],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>(ConfigToken.Database);
        return {
          uri: dbConfig.uri,
          user: dbConfig.username,
          pass: dbConfig.password,
        };
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const winstonOption = new LoggerOption(configService);
        return { transports: [winstonOption.console()] };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
