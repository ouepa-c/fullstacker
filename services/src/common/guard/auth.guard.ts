import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Roles } from '../../../enum/global'
import UserProfileByTokenGuard from './userProfile-byToken.guard'
import type { SignPayload } from '../../module/auth/auth.service'
import type { Response } from 'express'

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest<Response & { user: SignPayload }>()
    const roles = this.reflector.getAllAndOverride<Roles[]>('roles', [context.getHandler(), context.getClass()])
    return roles.includes(req.user.roleId)
  }
}

const Auth = (...roles: Roles[]) => applyDecorators(
  SetMetadata('roles', roles),
  UseGuards(
    UserProfileByTokenGuard,
    AuthGuard
  )
)

export default Auth
