import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const appPort: number = configService.getOrThrow<number>('APP_PORT');

  // console.log({ appPort });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // app.useGlobalInterceptors(new NestInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  if (configService.getOrThrow<string>('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);

}
bootstrap();
