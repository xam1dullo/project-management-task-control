import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationConfig } from '@config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = new ApplicationConfig();
  const appPort: number = appConfig.appPort | 3001;

  // console.log({ appPort });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      whitelist: true,
    }),
  );

  // app.useGlobalInterceptors(new NestInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  if (appConfig.nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
  });
}
bootstrap();
