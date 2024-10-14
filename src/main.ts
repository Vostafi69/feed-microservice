import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './main/config/docs/swagger.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  swaggerConfig(app);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('v1');

  await app.listen(port, () =>
    logger.log(`Server is running at: http://localhost:${port}`),
  );
}
bootstrap();
