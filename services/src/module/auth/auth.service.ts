import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService
  ) {
  }

  awardToken(payload: SignPayload) {
    return this.jwt.signAsync(payload)
  }

  verifyToken(token: string) {
    try {
      return this.jwt.verifyAsync<SignPayload>(token)
    } catch (err) {
      throw new UnauthorizedException('no authorization', '登录过期，请重新登录')
    }
  }
}
