import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import dtoNonEmpty from '../../utils/dto.non-empty'
import LoginUserDto from './dto/login-user.dto'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import type { SignPayload } from '../auth/auth.service'
import { Roles } from '../../../enum/global'
import { PrismaService } from 'nestjs-prisma'
import VerifyUserExistPipe from './pipe/verify-user-exist.pipe'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {
  }

  /**
   * @description 注册用户
   * */
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    // 不允许传递头像
    createUserDto.avatar && delete createUserDto.avatar
    return this.userService.register(createUserDto)
  }

  /**
   * @description 登录，未注册的用户直接注册 -> 登录成功
   * */
  @Post('signin')
  signIn(
    @Body() loginUserDto: LoginUserDto
  ) {
    return this.userService.signIn(loginUserDto)
  }

  /**
   * @description 用户列表
   * */
  @Get()
  findAll(
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.userService.findAll(page, size)
  }

  /**
   * @description 获取某个用户
   * */
  @Get(':id')
  findOne(@Param('id', VerifyUserExistPipe) id: number) {
    return this.userService.findOne(id)
  }

  /**
   * @description 用户更新信息，用户不可以更新自己的roleId
   * */
  @Patch(':id')
  @UseGuards(UserProfileByTokenGuard)
  update(
    @Param('id', VerifyUserExistPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    dtoNonEmpty(updateUserDto)
    this.updateAndRemoveIdentification(req.user, id)
    return this.userService.update(id, updateUserDto)
  }

  /**
   * @description 用户 删除/自注销，只有超级管理员可删除所有用户
   * */
  @Delete(':id')
  @UseGuards(UserProfileByTokenGuard)
  remove(
    @Param('id', VerifyUserExistPipe) id: number,
    @Req() req
  ) {
    this.updateAndRemoveIdentification(req.user, id)
    return this.userService.remove(id)
  }

  updateAndRemoveIdentification(user: SignPayload, sign: number) {
    // 超管具备所有权限
    if (user.roleId === Roles.SUPER_ADMIN) return
    // 修改的是不是自己的信息
    if (user.userId !== sign) {
      throw new ForbiddenException()
    }
    return void 0
  }
}
