import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Request } from 'express'
import VerifyArticleExistPipe from '../article/pipe/verify-article-exist.pipe'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import VerifyCommentExistPipe from './pipe/verify-comment-exist.pipe'
import VerifyUserExistPipe from '../user/pipe/verify-user-exist.pipe'
import { UserService } from '../user/user.service'

@Controller('comments')
@UseGuards(UserProfileByTokenGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly userService: UserService
  ) {
  }

  /**
   * @description 回复文章
   * */
  @Post('article/:id')
  review_article(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id', VerifyArticleExistPipe) artId: number,
    @Req() req: Request
  ) {
    const user = req.user as SignPayload
    return this.commentsService.createArtComment(artId, user, createCommentDto)
  }

  /**
   * @description 回复评论
   * */
  @Post(':commentId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('commentId', VerifyCommentExistPipe) commentId: number,
    @Req() req: Request
  ) {
    const user = req.user as SignPayload
    return this.commentsService.handleReplyComment(commentId, user, createCommentDto)
  }

  @Get('user/:userId')
  @UseGuards(UserProfileByTokenGuard)
  findCommentByUser(
    @Param('userId', VerifyUserExistPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Req() req: Request
  ) {
    const user = req.user as SignPayload
    return this.commentsService.findCommentByUser(user, {
      page,
      size
    }, userId)
  }

  @Get('article/:id')
  findOne(@Param('id', VerifyCommentExistPipe) id: string) {
    return this.commentsService.findOne(+id)
  }

  /**
   * @description 超管和区域管理可以删除所有评论 用户仅仅可以删除自己的评论
   * */
  @Delete(':id')
  @UseGuards(UserProfileByTokenGuard)
  async remove(
    @Param('id', VerifyCommentExistPipe) id: number,
    @Req() req: Request
  ) {
    const {data: {user_id}} = await this.commentsService.findOne(id)
    const user = req.user as SignPayload
    // console.log('被删除评论的用户id：',user_id,'执行删除的用户id：', user.userId)
    await this.userService.roleAuthentication(
      user,
      user_id
    )
    return this.commentsService.remove(id)
  }
}
