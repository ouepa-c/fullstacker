import { IsNumber, IsString, Length } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @Length(2, 15, {
    message: '请输入文章标题2-15位'
  })
  title: string

  @IsString()
  content: string

  @IsNumber({
    maxDecimalPlaces: 0
  })
  categoryId: number
}
