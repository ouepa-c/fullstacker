import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import { Request } from 'express'
import { UpdateCategoryDto } from '../category/dto/update-category.dto'
import dtoNonEmpty from '../../utils/dto.non-empty'
import VerifyArticleExistPipe from './pipe/verify-article-exist.pipe'
import { UserService } from '../user/user.service'
import VerifyUserExistPipe from '../user/pipe/verify-user-exist.pipe'

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService
  ) {
  }

  /**
   * @description 文章发布
   * */
  @Post()
  @UseGuards(UserProfileByTokenGuard)
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: Request
  ) {
    const user = req.user as SignPayload
    return this.articleService.create(createArticleDto, user)
  }

  /**
   * @description 文章更新
   * @desc 用户可以更新自己的文章，超管和区域管理可以更新所有文章
   * */
  @Patch(':id')
  @UseGuards(UserProfileByTokenGuard)
  async updateArticle(
    @Body() updateCateDto: UpdateCategoryDto,
    @Req() req: Request,
    @Param('id', VerifyArticleExistPipe) id: number
  ) {
    dtoNonEmpty(updateCateDto)
    const {data: {userId}} = await this.articleService.findOne(id)
    await this.userService.roleAuthentication(
      req.user as SignPayload,
      userId
    )
    return this.articleService.update(id, updateCateDto)
  }

  /**
   * @description 文章列表
   * */
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number
  ) {
    return this.articleService.findAll(page, size)
  }

  /**
   * @description 获取指定的文章
   * */
  @Get(':id')
  findOne(@Param('id', VerifyArticleExistPipe) id: number) {
    return this.articleService.findOne(id)
  }

  /**
   * @description 删除文章
   * @desc 用户可以删除自己的文章  区域管理和超管可以删除所有人的文章
   * */
  @Delete(':id')
  @UseGuards(UserProfileByTokenGuard)
  async remove(
    @Req() req: Request,
    @Param('id', VerifyArticleExistPipe) id: number
  ) {
    const {data: {userId}} = await this.articleService.findOne(id)
    await this.userService.roleAuthentication(
      req.user as SignPayload,
      userId
    )
    return this.articleService.remove(id)
  }

  /**
   * @description 获取某个用户的文章列表
   * */
  @Get('user/:id')
  findUserArticleList(
    @Param('id', VerifyUserExistPipe) id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number
  ) {
    return this.articleService.findUserArticleList(id, page, size)
  }

  /**
   * @description 获取某一篇文章的评论列表
   * */
  @Get('comments/:artId')
  findCommentsByArtId(
    @Param('artId', VerifyArticleExistPipe) artId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number
  ) {
    return this.articleService.getComments(artId, page, size)
  }
}
