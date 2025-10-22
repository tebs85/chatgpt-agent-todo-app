import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Backend server running on http://localhost:3000');
}
bootstrap();
