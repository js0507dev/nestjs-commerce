import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@src/config/index';

enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface CommonConfig {
  nodeEnv: NodeEnvironment;
  port: number;
}

export function commonConfig() {
  return registerAs(
    ConfigToken.Common,
    (): CommonConfig => ({
      nodeEnv: NodeEnvironment[process.env.NODE_ENV] || NodeEnvironment.Development,
      port: Number(process.env.PORT) || 3000,
    }),
  );
}
