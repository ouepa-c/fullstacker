import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import { Request } from 'express'
import type { SignPayload } from '../auth/auth.service'
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

  @Get()
  findAll() {
    return this.articleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', VerifyArticleExistPipe) id: number) {
    return this.articleService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id', VerifyUserExistPipe) id: string) {
    return this.articleService.remove(+id)
  }
}
