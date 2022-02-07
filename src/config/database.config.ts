import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@src/config/index';

export interface DatabaseConfig {
  uri: string;
  username: string;
  password: string;
}

export function databaseConfig() {
  return registerAs(
    ConfigToken.Database,
    (): DatabaseConfig => ({
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bd-shopping-local',
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
    }),
  );
}
