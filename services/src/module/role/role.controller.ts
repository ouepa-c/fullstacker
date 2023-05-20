import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RoleService } from './role.service'
import CreateRoleDto from './dto/create-role.dto'
import UpdateRoleDto from './dto/update-role.dto'
import VerifyRoleExistPipe from './pipe/verify-role-exist.pipe'
import dtoNonEmpty from '../../utils/dto.non-empty'
import Auth from '../../common/guard/auth.guard'
import { Roles } from '../../../enum/global'

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
  @Auth(Roles.SUPER_ADMIN)
  create(@Body() roledto: CreateRoleDto) {
    return this.roleService.create(roledto)
  }

  @Patch(':id')
  @Auth(Roles.SUPER_ADMIN)
  update(
    @Body() roledto: UpdateRoleDto,
    @Param('id', VerifyRoleExistPipe) id: number
  ) {
    dtoNonEmpty(roledto)
    return this.roleService.update(roledto, id)
  }

  @Delete(':id')
  @Auth(Roles.SUPER_ADMIN)
  remove(
    @Param('id', VerifyRoleExistPipe) id: number
  ) {
    return this.roleService.remove(id)
  }
}
