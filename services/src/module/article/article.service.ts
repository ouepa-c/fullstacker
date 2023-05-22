import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import type { SignPayload } from '../auth/auth.service'
import { PrismaService } from 'nestjs-prisma'
import { fullfill } from '../../common/interceptor/transform.interceptor'

const article_select = {
  id: true,
  title: true,
  category: {
    select: {
      id: true,
      title: true,
      desc: true,
      create_at: true
    }
  },
  create_at: true,
  userId: true
}

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async create(createArticleDto: CreateArticleDto, user: SignPayload) {
    const {userId} = user
    const art = await this.prisma.article.create({
      data: {
        ...createArticleDto,
        userId
      },
      select: {
        ...article_select
      }
    }).catch(() => {
      throw new BadRequestException('标题重复', '请检查标题')
    })

    return fullfill({
      msg: '文章创建成功',
      data: art
    })
  }

  findAll() {
    return `This action returns all article`
  }

  async findOne(id: number) {
    const art = await this.prisma.article.findUnique({
      where: {id},
      select: {
        ...article_select
      }
    })
    return fullfill({
      data: art
    })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const art = await this.prisma.article.update({
      where: {id},
      data: {...updateArticleDto},
      select: {...article_select}
    })
    return fullfill({
      msg: '更新成功',
      data: art
    })
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
