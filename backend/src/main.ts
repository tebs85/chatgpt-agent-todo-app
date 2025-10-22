import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security: Helmet middleware for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('A simple and secure Todo application API')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Backend server running on http://localhost:3000');
  console.log('Swagger documentation available at http://localhost:3000/api/docs');
}
bootstrap();
