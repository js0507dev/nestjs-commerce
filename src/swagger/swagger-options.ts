import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export function makeSwaggerDocumentConfig() {
  return new DocumentBuilder()
    .setTitle('BD Shopping Docs')
    .setDescription('BD Shopping API description')
    .setVersion('1.0')
    .build();
}
export function makeSwaggerDocumentOptions(): SwaggerDocumentOptions {
  return {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
}

export function makeCustomSwaggerOptions(): SwaggerCustomOptions {
  return {
    swaggerOptions: {
      persistAuthorization: true, // 새로고침 후에도 인증토큰 유지
    },
    customSiteTitle: 'BD Shopping API Docs',
  };
}
