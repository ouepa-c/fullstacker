import { $http } from '@/service'
import { Profile } from 'http/profile/interface'

enum Urls {
  UserLogin = '/user/signin',
  UserRegister = '/user'
}

/**
 * 登录接口
 * */
export const handleLogin = (info: LoginInfo) =>
  $http.post<ResponsePayload<WithToken<Profile>>>({
    url: Urls.UserLogin,
    data: {
      ...info
    }
  })

/**
 * 用户注册
 * */
export const handleRegister = (info: RegisterInfo) =>
  $http.post<ResponsePayload<WithToken<Profile>>>({
    url: Urls.UserRegister,
    data: {
      ...info
    }
  })
