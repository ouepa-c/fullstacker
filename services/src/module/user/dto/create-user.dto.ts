import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { Exclude } from 'class-transformer'

export class CreateUserDto {
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

  @IsOptional()
  @IsString()
  readonly github: string

  @IsOptional()
  @IsEmail({}, {
    message: '邮箱格式错误'
  })
  readonly email: string

  @IsOptional()
  @IsString()
  readonly phone: string

  @IsOptional()
  @IsString()
  readonly qq: string

  @IsOptional()
  @IsString()
  readonly wechat: string

  @IsOptional()
  @IsString()
  readonly signature: string

  @IsOptional()
  @IsNumber()
  readonly roleId: number

  @Exclude()
  avatar: string
}
