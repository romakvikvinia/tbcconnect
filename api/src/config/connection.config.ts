import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/tbc',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
