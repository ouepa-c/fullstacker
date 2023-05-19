import { BadRequestException, Injectable } from '@nestjs/common'
import { fullfill } from '../../common/interceptor/transform.interceptor'
import type CreateRoleDto from './dto/create-role.dto'
import { PrismaService } from 'nestjs-prisma'
import UpdateRoleDto from './dto/update-role.dto'

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async findAll() {
    const roles = await this.prisma.role.findMany({
      select: {
        name: true,
        intro: true,
        create_at: true
      }
    })
    return fullfill({
      data: roles
    })
  }

  async create(roledto: CreateRoleDto): Promise<Result> {
    try {
      const {
        name, intro
      } = roledto
      const result = await this.prisma.role.create({
        data: {
          name, intro
        },
        select: {
          name: true,
          intro: true,
          create_at: true
        }
      })

      return fullfill({
        msg: '角色创建成功',
        data: result
      })
    } catch (err) {
      throw new BadRequestException('roleAlreadyExists', '角色已存在')
    }
  }

  async update(roledto: UpdateRoleDto, role_id: number) {
    const {name, intro} = roledto
    await this.prisma.role.update({
      data: {
        name, intro
      },
      where: {
        id: role_id
      }
    })
    return fullfill({
      msg: '角色更新成功'
    })
  }

  async remove(role_id: number) {
    await this.prisma.role.delete({
      where: {
        id: role_id
      }
    })
    return fullfill({
      msg: '角色已删除'
    })
  }
}
