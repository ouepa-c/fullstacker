import { BadRequestException, Controller, Post, Req, UploadedFile, UseGuards } from '@nestjs/common'
import { UploadService } from './upload.service'
import UserProfileByTokenGuard from '../../common/guard/userProfile-byToken.guard'
import { Request } from 'express'
import { UserAvatar } from './decorators/avatar.decorator'

@Controller()
@UseGuards(UserProfileByTokenGuard)
export class UploadController {
  constructor(
    private readonly uploadService: UploadService
  ) {
  }

  @Post('user_avatar')
  @UserAvatar()
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException('请选择文件')
    // const out = await sharp(file.path)
    //   .resize(300, 300, {})
    //   .toBuffer()
    // await fs.promises.writeFile(file.path, out, {
    //   flag: 'w'
    // })
    return this.uploadService.userAvatar(req.user, file)
  }
}
