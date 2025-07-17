import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Logger middleware
  app.use((req, res, next) => {
    const logger = new Logger('HTTP');
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - start;
      logger.log(`${method} ${originalUrl} ${res.statusCode} - ${ms}ms`);
    });
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
