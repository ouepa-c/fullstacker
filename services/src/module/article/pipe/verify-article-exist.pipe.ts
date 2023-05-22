import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export default class VerifyArticleExistPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata) {
    const id = parseInt(value, 10)
    if (isNaN(id)) {
      throw new BadRequestException('validation failed', '文章id必须为数字')
    }
    const has = await this.prisma.article.findUnique({
      where: {id}
    })
    if (!has) {
      throw new BadRequestException('validation failed', '文章不存在')
    }
    return id
  }
}
