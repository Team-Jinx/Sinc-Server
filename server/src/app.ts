/* eslint-disable no-console */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { Logger } from './common';
import { PrismaService } from './prisma';

async function bootstrap(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);
  app.useLogger(await app.resolve(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      transform: true, // transform object to DTO class
    }),
  );

  if (isProduction) {
    app.enable('trust proxy');
  }

  middleware(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap()
  .then(() => console.log('Bootstrap', new Date().toLocaleString()))
  .catch(console.error);
