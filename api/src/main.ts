import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * set global prefix api
   */
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT || 3001, () => {
    logger.log(`Server is running on port: ${process.env.APP_PORT || 3001}`);
  });
}
bootstrap();
