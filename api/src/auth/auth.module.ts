import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtConfig } from 'src/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    //Authentication configuration
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register(JwtConfig),
    //Authentication configuration end
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
