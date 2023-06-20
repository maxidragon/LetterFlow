import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Authorization',
      'X-Requested-With',
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Origin',
    ],
  });
  await app.listen(3000);
}

bootstrap();
