import { IsString } from 'class-validator'

export default class CreateRoleDto {
  @IsString({
    message: '请输入角色名称'
  })
  name: string

  @IsString({
    message: '请输入角色描述'
  })
  intro: string
}
