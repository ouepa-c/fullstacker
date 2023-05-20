import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Request } from 'express'
import type { SignPayload } from '../auth/auth.service'
import dtoNonEmpty from '../../utils/dto.non-empty'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import { UserService } from '../user/user.service'
import { PrismaService } from 'nestjs-prisma'
import VerifyCategoryExistPipe from './pipe/verify-category-exist.pipe'
import { permissionMap } from '../role/constants'

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService
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

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', VerifyCategoryExistPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  /**
   * @description 用户可以更新自己的栏目，超管和区域管理可以更新所有栏目
   * */
  @Patch(':id')
  @UseGuards(UserProfileByTokenGuard)
  async update(
    @Param('id', VerifyCategoryExistPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request
  ) {
    dtoNonEmpty(updateCategoryDto)
    return this.updateAndDeleteCategoryAuthentication(
      req.user as SignPayload,
      id,
      this.categoryService.update(id, updateCategoryDto)
    )
  }

  /**
   * @description 普通用户只能删除自己的栏目，超管或区域管理可以删除所有栏目
   * */
  @Delete(':id')
  @UseGuards(UserProfileByTokenGuard)
  remove(
    @Param('id', VerifyCategoryExistPipe) id: number,
    @Req() req: Request
  ) {
    return this.updateAndDeleteCategoryAuthentication(
      req.user as SignPayload,
      id,
      this.categoryService.remove(id)
    )
  }

  async updateAndDeleteCategoryAuthentication(
    user: SignPayload,
    categoryId: number,
    returns: Promise<any>
  ) {
    const {
      roleId: sourceRoleId,
      userId: sourceUserId
    } = user

    const {data: {userId}} = await this.categoryService.findOne(categoryId)

    // 如果非本人操作，角色鉴权
    if (userId !== sourceUserId) {
      const {data: {roleId}} = await this.userService.findOne(userId)
      // 角色不一致
      const has_permission = permissionMap[sourceRoleId].includes(roleId)
      if (!has_permission) {
        // 没有权限
        throw  new ForbiddenException()
      } else {
        return await returns
      }
    } else {
      return await returns
    }
  }
}
