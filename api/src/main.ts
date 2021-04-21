import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * set global prefix api
   */
  app.setGlobalPrefix('api');

  /**
   * Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('TBCConnect')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  /**
   * Cors
   */
  if (process.env.APP_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: process.env.APP_ORIGIN });
    logger.log(`Allow Origin "${process.env.APP_ORIGIN}"`);
  }

  await app.listen(process.env.APP_PORT || 3001, () => {
    logger.log(`Server is running on port: ${process.env.APP_PORT || 3001}`);
  });
}
bootstrap();
