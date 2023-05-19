import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export default class VerifyRoleExistPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10)
    if (isNaN(id)) {
      throw new BadRequestException('validation failed', '角色id必须为数字')
    }
    const has_role = await this.prisma.role.findUnique({
      where: {id}
    })
    if (!has_role) {
      throw new BadRequestException('validation failed', '角色不存在')
    }
    return id
  }
}
