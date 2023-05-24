import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from 'nestjs-prisma'
import { fullfill } from '../../common/interceptor/transform.interceptor'
import { userinfo_response } from '../user/user.service'

export const article_select = {
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
    const existingArticle = await this.prisma.article.findMany({
      where: {title: createArticleDto.title, userId},
      select: {id: true}
    })
    if (existingArticle.length) {
      throw new BadRequestException('not allowed', '你已经有该标题的文章了，换一个吧')
    }
    const art = await this.prisma.article.create({
      data: {
        ...createArticleDto,
        userId
      },
      select: {
        ...article_select
      }
    })

    return fullfill({
      msg: '文章创建成功',
      data: art
    })
  }

  async findAll(page: number, size: number) {
    const arts = await this.prisma.article.findMany({
      skip: (page - 1),
      take: size,
      select: {
        ...article_select,
        content: true
      }
    })
    return fullfill({
      data: arts
    })
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

  async remove(id: number) {
    const art = await this.prisma.article.delete({
      where: {id},
      select: {...article_select}
    })
    return fullfill({
      msg: '删除成功',
      data: art
    })
  }

  async findUserArticleList(userId: number, page: number, size: number) {
    const arts = await this.prisma.article.findMany({
      where: {userId},
      skip: (page - 1) * size,
      take: size,
      select: {
        ...article_select,
        content: true
      }
    })
    return fullfill({
      data: arts
    })
  }

  async getComments(artId: number, page: number, size: number) {
    const comments = await this.prisma.art_comment.findMany({
      where: {
        article_id: artId
      },
      skip: (page - 1) * size,
      take: size,
      select: {
        id: true,
        article_id: true,
        content: true,
        create_at: true,
        user: {
          select: {...userinfo_response}
        },
        comments: {
          select: {
            id: true,
            content: true,
            create_at: true,
            user: {
              select: {
                ...userinfo_response
              }
            }
          }
        }
      }
    })
    return fullfill({
      data: comments
    })
  }
}
