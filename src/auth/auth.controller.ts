import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';

import { AuthService } from '@src/auth/auth.service';
import { LocalAuthGuard } from '@src/auth/guard/local-auth.guard';

// TODO: temp login dto
class LoginDto {
  @ApiProperty({ description: '이메일주소' })
  email: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // passport lib 로그인 검증
  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Login Success!' })
  @ApiResponse({ status: 401, description: 'Login Failed!' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
