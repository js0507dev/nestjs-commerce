import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from '@src/app.module';
import { CommonConfig, ConfigToken } from '@src/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const commonConfig: CommonConfig = configService.get<CommonConfig>(ConfigToken.Common);
  await app.listen(commonConfig.port);
}
bootstrap();
