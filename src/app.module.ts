import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import * as config from '@src/config';
import { ConfigToken, DatabaseConfig } from '@src/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
