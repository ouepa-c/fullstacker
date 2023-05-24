import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export default class VerifyCommentExistPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10)
    if (isNaN(id)) {
      throw new BadRequestException('validation failed', '评论id必须为数字类型')
    }
    const has = await this.prisma.art_comment.findUnique({
      where: {id}
    })
    if (!has) {
      throw new BadRequestException('validation failed', '评论不存在或已被删除')
    }
    return id
  }
}
