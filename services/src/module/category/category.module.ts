import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {
}
