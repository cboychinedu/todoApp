// Importing the necessary modules 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// The main entry point of the application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));

  // Enabling CORS for all origins (you can customize this as needed)
  app.enableCors();

  // Run the application on the specified port (default to 3001 if not set in environment variables)
  await app.listen(process.env.PORT ?? 3001);
}

// Calling the bootstrap function to start the application
bootstrap();
