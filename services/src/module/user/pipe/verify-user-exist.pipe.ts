import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export default class VerifyUserExistPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10)
    if (isNaN(id)) {
      throw new BadRequestException('validation failed', '用户id必须为数字')
    }
    const has = await this.prisma.user.findUnique({
      where: {id}
    })
    if (!has) {
      throw new BadRequestException('validation failed', '用户不存在')
    }
    return id
  }
}
