import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {
}
