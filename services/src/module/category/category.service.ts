import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from 'nestjs-prisma'
import { SignPayload } from '../auth/auth.service'
import { fullfill } from '../../common/interceptor/transform.interceptor'

const category_select = {
  id: true,
  title: true,
  desc: true,
  create_at: true,
  userId: true
}

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto, {userId}: SignPayload) {
    const cate = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId
      },
      select: {
        ...category_select
      }
    }).catch(() => {
      throw new BadRequestException('栏目已存在')
    })
    return fullfill({
      msg: '栏目创建成功',
      data: cate
    })
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      select: {...category_select}
    })
    return fullfill({
      data: categories
    })
  }

  async findOne(id: number) {
    const res = await this.prisma.category.findUnique({
      where: {id},
      select: {...category_select}
    })
    return fullfill<Record<keyof typeof category_select, any>>({
      data: res
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: {id},
      data: {...updateCategoryDto},
      select: {...category_select}
    })
    return fullfill({
      msg: '更新成功',
      data: category
    })
  }

  async remove(id: number) {
    await this.prisma.category.delete({
      where: {id}
    })
    return fullfill({
      msg: '删除成功'
    })
  }
}
