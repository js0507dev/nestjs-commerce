import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CommonConfig, ConfigToken } from '@src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<CommonConfig>(ConfigToken.Common).jwtSecret,
    });
  }

  /**
   * JWT 검증
   * Authorization header의 Bearer token을 verify 해서 payload를 가져옴
   * @param payload
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}