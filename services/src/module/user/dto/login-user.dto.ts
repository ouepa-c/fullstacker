import { IsString, Length } from 'class-validator'

export default class LoginUserDto {
  @IsString()
  @Length(4, 12, {
    message: '请输入用户名4-12位'
  })
  readonly username: string

  @IsString()
  @Length(4, 12, {
    message: '请输入密码8-15位'
  })
  readonly password: string
}
