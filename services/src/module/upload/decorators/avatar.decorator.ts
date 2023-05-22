import { applyDecorators, NotAcceptableException, UseInterceptors } from '@nestjs/common'
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { Request } from 'express'
import generateFilename from '../../../utils/generateFilename'
import { FileField, imageType } from '../../../../enum/global'

export const fileFilter = (types: string[], field: FileField) =>
  (req: any, file: Express.Multer.File, callback: (error: (Error | null), acceptFile: boolean) => void) => {
    const isAcceptable = types.includes(file.originalname.split('.').pop())
    if (!isAcceptable)
      return callback(new NotAcceptableException('不支持该文件格式'), false)
    callback(null, true)
  }

export const UserAvatar = (options?: MulterOptions) => applyDecorators(
  UseInterceptors(
    FileInterceptor(FileField.AVATAR, {
      ...options,
      storage: diskStorage({
        destination: path.join(__dirname, '../../../../static/user_avatar'),
        filename(req: Request, file: Express.Multer.File,
          callback: (error: (Error | null), filename: string) => void) {
          const name = generateFilename(file.originalname)
          callback(null, name)
        }
      }),
      fileFilter: fileFilter(imageType, FileField.AVATAR),
      limits: {
        fileSize: 1024 * 1024 * 5 // 头像最大 5 mb
      }
    })
  )
)
