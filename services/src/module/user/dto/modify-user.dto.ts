import { IsNumber, IsString } from 'class-validator'

export default class ModifyUserDto {
  @IsNumber()
  userId: number

  @IsNumber()
  roleId: number

  @IsString({
    message: '请输入超管密钥'
  })
  super_key: string
}
