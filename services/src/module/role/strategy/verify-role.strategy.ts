import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class VerifyRoleStrategy extends PassportStrategy(Strategy, 'verify-role') {
  constructor() {
    super()
  }

  async validate(value: any) {
    console.log(value)
  }

}

//
// @Injectable()
// export default class VerifyRoleGuard extends AuthGuard('verify-role') {
// }
