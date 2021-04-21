import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfig: JwtModuleOptions = {
  secret: process.env.APP_SECRET || 'tbcConnectSecret',
  signOptions: {
    expiresIn: Number(process.env.JWT_EXPIRE || 3600), // 1 hour
  },
};
