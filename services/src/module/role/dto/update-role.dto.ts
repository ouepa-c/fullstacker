import CreateRoleDto from './create-role.dto'
import { PartialType } from '@nestjs/mapped-types'

export default class UpdateRoleDto extends PartialType(CreateRoleDto) {
}
