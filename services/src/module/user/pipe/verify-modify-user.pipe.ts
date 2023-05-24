import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import type ModifyUserDto from '../dto/modify-user.dto'
import { PrismaService } from 'nestjs-prisma'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class VerifyModifyUserPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
  }

  async transform(value: ModifyUserDto, metadata: ArgumentMetadata) {
    const {userId, roleId, super_key} = value
    const userProfile = await this.prisma.user.findUnique({
      where: {id: userId}
    })
    const role = await this.prisma.role.findUnique({
      where: {id: roleId}
    })
    if (!role || !userProfile) {
      throw new BadRequestException('failed', '角色或用户不存在')
    }
    const superKey = this.config.get<string>('SUPER_KEY')
    if (superKey !== super_key) {
      throw new BadRequestException('failed', 'superKey错误')
    }
    return value
  }
}
