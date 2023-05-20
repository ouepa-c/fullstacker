import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

interface SignPayload {
  userId: number
  roleId: number
}

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
    return this.jwt.verifyAsync<SignPayload>(token)
  }
}
