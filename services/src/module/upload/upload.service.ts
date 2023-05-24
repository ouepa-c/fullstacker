import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import * as fs from 'fs'
import * as path from 'path'
import { fullfill } from '../../common/interceptor/transform.interceptor'
import { ConfigService } from '@nestjs/config'
import { user } from '@prisma/client'

export const avatar_select = {
  mimeType: true,
  size: true,
  originalname: true,
  avatar: true,
  create_at: true
}

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
  }

  async userAvatar(user, file: Express.Multer.File) {
    const {userId} = user as SignPayload
    const user_avatar = await this.prisma.avatar.findUnique({
      where: {
        userId
      }
    })
    // 更新头像
    if (user_avatar) {
      const {avatar, id} = user_avatar
      await fs.promises.unlink(
        path.join(__dirname, `../../../static/user_avatar/${avatar}`)
      )
      const update_avatar = await this.prisma.avatar.update({
        where: {id},
        data: {
          mimeType: file.mimetype,
          size: file.size,
          originalname: file.originalname,
          avatar: file.filename
        },
        select: {...avatar_select}
      })
      const {avatar: avatar_path} = await this.updateUserAvatar(
        userId,
        this.getFilePath(`user/avatar/${userId}`)
      )
      return fullfill({
        msg: '头像更新成功',
        data: {
          ...update_avatar,
          path: avatar_path
        }
      })
    }
    // 上传头像
    else {
      const avatar = await this.prisma.avatar.create({
        data: {
          mimeType: file.mimetype,
          size: file.size,
          originalname: file.originalname,
          avatar: file.filename,
          userId
        },
        select: {...avatar_select}
      })
      const {avatar: avatar_path} = await this.updateUserAvatar(
        userId,
        this.getFilePath(`user/avatar/${userId}`)
      )
      return fullfill({
        msg: '头像上传成功',
        data: {
          ...avatar,
          path: avatar_path
        }
      })
    }
  }

  async updateUserAvatar(userId: number, avatar: string): Promise<user> {
    return await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        avatar
      }
    })
  }

  getFilePath(field: string) {
    return `${
      this.config.get('APP_PROTOCOL')
    }://${
      this.config.get('APP_HOST')
    }:${
      this.config.get('APP_PORT')
    }/${field}`
  }
}
