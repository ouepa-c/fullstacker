import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { PrismaService } from 'nestjs-prisma'
import { fullfill } from '../../common/interceptor/transform.interceptor'
import { article_select } from '../article/article.service'

export const comment_select = {
  id: true,
  content: true,
  create_at: true,
  article: {
    select: {...article_select}
  }
}

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async createArtComment(artId: number, user: SignPayload, createCommentDto: CreateCommentDto) {
    const {userId} = user
    await this.prisma.art_comment.create({
      data: {
        ...createCommentDto,
        user_id: userId,
        article_id: artId,
        support: 0
      }
    })
    return fullfill({
      msg: '评论成功'
    })
  }

  async handleReplyComment(
    commentId: number,
    user: SignPayload,
    createCommentDto: CreateCommentDto
  ) {
    const {userId} = user
    await this.prisma.cmts_comments.create({
      data: {
        parentId: commentId,
        user_id: userId,
        content: createCommentDto.content
      }
    })
    return fullfill({
      msg: '回复成功'
    })
  }

  async findCommentByUser(user: SignPayload, {page, size}: PageMeta, targetUserId: number) {
    const {userId} = user
    const result = await this.prisma.art_comment.findMany({
      where: {user_id: targetUserId},
      skip: (page - 1) * size,
      take: size,
      select: {...comment_select}
    })
    if (targetUserId !== userId) {
      /**
       * comments_public字段，表示用户是否愿意公开自己的评论列表，介于 0或1
       * */
      const {comments_public} = await this.prisma.user.findUnique({
        where: {id: targetUserId},
        select: {comments_public: true}
      })
      // 目标用户的信息是否公开
      if (comments_public !== 1) {
        return fullfill({
          msg: '用户为公开评论信息',
          data: []
        })
      } else {
        return fullfill({
          data: result
        })
      }
    } else {
      return fullfill({
        data: result
      })
    }
  }

  async findOne(id: number) {
    const result = await this.prisma.art_comment.findUnique({
      where: {id},
      select: {
        ...comment_select,
        user_id: true
      }
    })
    return fullfill({
      data: result
    })
  }

  async remove(id: number) {
    const result = await this.prisma.art_comment.delete({
      where: {id}
    })
    return fullfill({
      msg: '评论删除成功'
    })
  }
}
