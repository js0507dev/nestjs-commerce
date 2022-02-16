import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  //TODO: 테스트로 하드코딩함. 수정 필요!
  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    const user = { password: 'test', email: 'test@naver.com' };
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
