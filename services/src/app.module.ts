import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
    UserModule,
    RoleModule,
    AuthModule,
    CategoryModule,
    ArticleModule,
    CommentsModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
