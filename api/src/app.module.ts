import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from './config';
import { TemplateModule } from './template/template.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connectionConfig),
    TemplateModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
