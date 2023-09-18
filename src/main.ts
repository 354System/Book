import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the HTTP NestJS application
  const app = await NestFactory.create(AppModule,);

  // Enable CORS for localhost:4204
  app.enableCors({
    origin: 'http://localhost:4204',
    credentials: true,
  });

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start the HTTP server on port 3000
  await app.listen(3000);
}

bootstrap();
