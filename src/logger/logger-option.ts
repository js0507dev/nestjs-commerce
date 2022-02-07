import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

import { CommonConfig, ConfigToken } from '@src/config';

export class LoggerOption {
  private readonly transport: ConsoleTransportInstance;

  constructor(configService: ConfigService) {
    const commonConfig: CommonConfig = configService.get<CommonConfig>(ConfigToken.Common);
    this.transport = new transports.Console({
      format: format.combine(
        commonConfig.isLocal
          ? (format.colorize(), format.timestamp(), nestWinstonModuleUtilities.format.nestLike())
          : (format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
      ),
    });
  }

  public console() {
    return this.transport;
  }
}
