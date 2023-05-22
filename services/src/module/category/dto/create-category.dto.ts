import { IsString, Length } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @Length(4, 16, {
    message: '请输入栏目名称4-16位'
  })
  readonly title: string

  @IsString()
  @Length(10, 100, {
    message: '请输入栏目介绍10-100个字'
  })
  desc: string
}
