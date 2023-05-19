import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import VerifyUserExistPipe from './pipe/verify-user-exist.pipe'
import dtoNonEmpty from '../../utils/dto.non-empty'
import LoginUserDto from './dto/login-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // 不允许传递头像
    createUserDto.avatar && delete createUserDto.avatar
    return this.userService.create(createUserDto)
  }

  // todo 登录，未注册即注册后登录
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto
  ) {

  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id', VerifyUserExistPipe) id: number,
    @Body() updateUserDto: UpdateUserDto) {
    dtoNonEmpty(updateUserDto)
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
