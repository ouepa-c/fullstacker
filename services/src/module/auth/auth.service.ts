import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'

export interface SignPayload {
  userId: number
  roleId: number
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {
  }

  awardToken(payload: SignPayload) {
    return this.jwt.signAsync(payload)
  }

  verifyToken(token: string) {
    try {
      return this.jwt.verifyAsync<SignPayload>(token)
    } catch (err) {
      throw new BadRequestException('no authorization token')
    }
  }
}
