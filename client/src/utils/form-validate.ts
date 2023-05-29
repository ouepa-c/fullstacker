export enum FieldTypes {
  nickname = 'nickname',
  username = 'username',
  password = 'password',
  email = 'email',
  github = 'github',
  phone = 'phone'
}

export type Validator = Record<FieldTypes, (value: string) => (string | boolean)>

export const validator: Validator = {
  [FieldTypes.nickname](value: string) {
    if (!value) return '请输入昵称'
    if (!/^[a-zA-Z0-9\u4e00-\u9fa5]{4,10}$/.test(value)) {
      return '请输入昵称4-10位，无特殊字符'
    }
    return true
  },
  [FieldTypes.password](value: string) {
    if (!value) return '请输入密码'
    if (!/^[a-zA-Z0-9]{8,15}$/.test(value)) {
      return '请输入密码8-15位无特殊字符'
    }
    return true
  },
  [FieldTypes.username](value: string) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
      return '请输入用户名4-12位无特殊字符'
    }
    return true
  },
  email(value: string) {
    if (!value) return true
    if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
      return '邮箱格式错误'
    }
    return true
  },
  github(value: string) {
    if (!value) return true
    if (!/^https?:\/\/github\.com\/([a-zA-Z0-9_\-]+)\/([a-zA-Z0-9_\-]+)$/.test(value)) {
      return 'github地址格式错误'
    }
    return true
  },
  phone(value: string) {
    if (!value) return true
    if (!/^1\d{10}&/.test(value)) {
      return '手机号格式错误'
    }
    return true
  }
}

export const otherFieldValidate = {}
