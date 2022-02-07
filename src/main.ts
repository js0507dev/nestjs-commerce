import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from '@src/app.module';
import { CommonConfig, ConfigToken } from '@src/config';
import {
  makeCustomSwaggerOptions,
  makeSwaggerDocumentConfig,
  makeSwaggerDocumentOptions,
} from '@src/swagger/swagger-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // middlewares 설정
  app.use(helmet()); // 보안관련 http header 설정 추가
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); // nestjs default logger를 winston으로 변경
  app.useGlobalPipes(new ValidationPipe()); // validation layer 추가

  // swagger 설정
  const document = SwaggerModule.createDocument(app, makeSwaggerDocumentConfig(), makeSwaggerDocumentOptions());
  SwaggerModule.setup('docs', app, document, makeCustomSwaggerOptions());

  const configService: ConfigService = app.get(ConfigService);
  const commonConfig: CommonConfig = configService.get<CommonConfig>(ConfigToken.Common);
  await app.listen(commonConfig.port);
}
bootstrap();
