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
  Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import VerifyUserExistPipe from './pipe/verify-user-exist.pipe'
import dtoNonEmpty from '../../utils/dto.non-empty'
import LoginUserDto from './dto/login-user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    // 不允许传递头像
    createUserDto.avatar && delete createUserDto.avatar
    return this.userService.register(createUserDto)
  }

  @Post('signin')
  signIn(
    @Body() loginUserDto: LoginUserDto
  ) {
    return this.userService.signIn(loginUserDto)
  }

  @Get()
  findAll(
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.userService.findAll(page, size)
  }

  @Get(':id')
  findOne(@Param('id', VerifyUserExistPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', VerifyUserExistPipe) id: number,
    @Body() updateUserDto: UpdateUserDto) {
    dtoNonEmpty(updateUserDto)
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', VerifyUserExistPipe) id: number) {
    return this.userService.remove(id)
  }
}
