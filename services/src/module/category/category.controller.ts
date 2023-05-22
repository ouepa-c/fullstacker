import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Request } from 'express'
import type { SignPayload } from '../auth/auth.service'
import { AuthService } from '../auth/auth.service'
import dtoNonEmpty from '../../utils/dto.non-empty'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import { UserService } from '../user/user.service'
import { PrismaService } from 'nestjs-prisma'
import VerifyCategoryExistPipe from './pipe/verify-category-exist.pipe'
import VerifyUserExistPipe from '../user/pipe/verify-user-exist.pipe'

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {
  }

  /**
   * @description 每个用户都可以创建栏目
   * */
  @Post()
  @UseGuards(UserProfileByTokenGuard)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: Request
  ) {
    return this.categoryService.create(createCategoryDto, req.user as SignPayload)
  }

  /**
   * @description 获取分类列表
   * */
  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  /**
   * @description 获取单个栏目信息
   * */
  @Get(':id')
  findOne(@Param('id', VerifyCategoryExistPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  /**
   * @description 栏目更新
   * @desc 用户可以更新自己的栏目，超管和区域管理可以更新所有栏目
   * */
  @Patch(':id')
  @UseGuards(UserProfileByTokenGuard)
  async update(
    @Param('id', VerifyCategoryExistPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request
  ) {
    dtoNonEmpty(updateCategoryDto)
    const {data: {userId}} = await this.categoryService.findOne(id)
    await this.userService.roleAuthentication(
      req.user as SignPayload,
      userId
    )
    return this.categoryService.update(id, updateCategoryDto)
  }

  /**
   * @description 普通用户只能删除自己的栏目，超管或区域管理可以删除所有栏目
   * */
  @Delete(':id')
  @UseGuards(UserProfileByTokenGuard)
  async remove(
    @Param('id', VerifyCategoryExistPipe) id: number,
    @Req() req: Request
  ) {
    const {data: {userId}} = await this.categoryService.findOne(id)
    await this.userService.roleAuthentication(
      req.user as SignPayload,
      userId
    )
    return this.categoryService.remove(id)
  }

  /**
   * @description 获取某个用户的栏目列表
   * */
  @Get('user/:id')
  getListOfCategoriesForAUser(
    @Param('id', VerifyUserExistPipe) id: number
  ) {
    return this.categoryService.getListOfCategoriesForAUser(id)
  }
}
