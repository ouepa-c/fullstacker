import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import * as path from 'path'
import config from '../config'
import { UserModule } from './module/user/user.module'
import { RoleModule } from './module/role/role.module'
import { AuthModule } from './module/auth/auth.module'
import { CategoryModule } from './module/category/category.module'
import { ArticleModule } from './module/article/article.module'
import { CommentsModule } from './module/comments/comments.module'
import { MenuModule } from './module/menu/menu.module'
import { PrismaModule } from 'nestjs-prisma'
import { UploadModule } from './module/upload/upload.module'
import { UploadController } from './module/upload/upload.controller'

dotenv.config({
  path: path.join(__dirname, '../../.env')
})

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config]
    }),
    RoleModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ArticleModule,
    CommentsModule,
    MenuModule,
    UploadModule
  ],
  controllers: [UploadController]
})
export class AppModule {
}
