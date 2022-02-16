import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { CommonConfig, ConfigToken } from '@src/config';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const commonConfig = configService.get<CommonConfig>(ConfigToken.Common);
        return {
          secret: commonConfig.jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
