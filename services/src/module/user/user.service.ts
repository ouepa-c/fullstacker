import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'nestjs-prisma'
import { fullfill } from '../../common/interceptor/transform.interceptor'
import { hash, verify } from 'argon2'
import dtoNonPrimarykey from '../../utils/dto.non-primarykey'
import { AuthService } from '../auth/auth.service'
import LoginUserDto from './dto/login-user.dto'

const userinfo_response = {
  id: true,
  username: true,
  email: true,
  github: true,
  qq: true,
  wechat: true,
  phone: true,
  roleId: true,
  create_at: true
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const {password: originPsw, ...rest} = dtoNonPrimarykey(createUserDto, 'id')
      const password = await hash(originPsw)
      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password
        },
        select: {
          ...userinfo_response
        }
      })
      const token = await this.authService.awardToken({
        userId: user.id,
        roleId: user.roleId
      })
      return fullfill({
        msg: '用户注册成功',
        data: {
          user,
          token
        }
      })
    } catch (e) {
      console.log(e)
      throw new BadRequestException('userAlreadyExists', '用户已被注册，请检查邮箱或手机号')
    }
  }

  async findAll(page: number, size: number) {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * size,
      take: size,
      select: {
        ...userinfo_response,
        role: {
          select: {id: true, name: true, intro: true}
        }
      }
    })
    return fullfill({
      data: users
    })
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id},
      select: {
        ...userinfo_response
      }
    })
    return fullfill({
      msg: '查询成功',
      data: user
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {password, ...rest} = dtoNonPrimarykey(updateUserDto, 'id')
    if (password) {
      let encryption: string = void 0
      const {password: originPassword} = await this.prisma.user.findUnique({where: {id}, select: {password: true}})
      const isSame = await verify(originPassword, password)
      if (isSame) {
        throw new MethodNotAllowedException('密码和上一次一致')
      }
      encryption = await hash(password)
      await this.prisma.user.update({
        where: {id},
        data: {
          ...rest,
          password: encryption
        }
      })
      // 更新了密码前端需要重新登录  使用code 401 判断
      throw new UnauthorizedException('密码更新成功', '敏感操作重新登录')
    }
    await this.prisma.user.update({
      where: {id},
      data: {
        ...rest
      }
    })
    return fullfill({
      msg: '用户更新成功'
    })
  }

  async signIn(loginUserDto: LoginUserDto) {
    const {username, password} = loginUserDto
    const userinfo = await this.prisma.user.findUnique({
      where: {username},
      select: {
        password: true,
        id: true,
        roleId: true
      }
    })
    // 未注册直接注册
    if (!userinfo) {
      return this.register(loginUserDto as CreateUserDto)
    }
    const verify_user = await verify(userinfo.password, password)
    if (verify_user) {
      const token = await this.authService.awardToken({
        userId: userinfo.id,
        roleId: userinfo.roleId
      })
      return fullfill({
        msg: '登录成功',
        data: {token}
      })
    } else {
      throw new BadRequestException('登陆失败', '密码错误')
    }
  }

  async remove(id: number) {
    const user_profile = await this.prisma.user.delete({
      where: {
        id
      },
      select: {
        ...userinfo_response
      }
    })
    return fullfill({
      msg: '删除成功',
      data: user_profile
    })
  }
}
