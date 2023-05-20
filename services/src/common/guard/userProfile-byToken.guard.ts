import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthService } from '../../module/auth/auth.service'
import separateToken from '../../utils/separateToken'

@Injectable()
export default class UserProfileByTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    if (req?.user) return true
    const auth = req.headers?.authorization
      ? separateToken(req.headers.authorization as string)
      : void 0
    if (!auth) {
      throw new BadRequestException('No authorization')
    }
    req.user = await this.authService.verifyToken(auth)
    return true
  }
}
