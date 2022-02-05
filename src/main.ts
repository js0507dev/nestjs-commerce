import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _configService: ConfigService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
