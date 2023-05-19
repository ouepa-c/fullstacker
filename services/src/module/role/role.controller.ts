import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RoleService } from './role.service'
import CreateRoleDto from './dto/create-role.dto'
import UpdateRoleDto from './dto/update-role.dto'
import VerifyRoleExistPipe from './pipe/verify-role-exist.pipe'
import dtoNonEmpty from '../../utils/dto.non-empty'

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {
  }

  @Get()
  findAll() {
    return this.roleService.findAll()
  }

  @Post()
  create(@Body() roledto: CreateRoleDto) {
    return this.roleService.create(roledto)
  }

  @Patch(':id')
  update(
    @Body() roledto: UpdateRoleDto,
    @Param('id', VerifyRoleExistPipe) id: number
  ) {
    dtoNonEmpty(roledto)
    return this.roleService.update(roledto, id)
  }

  @Delete(':id')
  remove(
    @Param('id', VerifyRoleExistPipe) id: number
  ) {
    return this.roleService.remove(id)
  }
}
