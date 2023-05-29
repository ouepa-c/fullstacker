interface ResponsePayload<D = any> {
  code: number
  data: D
  success: boolean
  msg: string
}

interface ErrorResponse {
  code: number
  timestamp: string
  meta: {
    path: string
    method: string
  },
  success: boolean
  message: {
    statusCode: number
    message: string
    error: string
  }
}

type WithToken<T> = T & { token: string }

interface LoginInfo {
  username: string
  password: string

  [index: string]: any
}

interface RegisterInfo {
  nickname: string
  username: string
  password: string
  re_password: string
  github: string
  email: string
  phone: string

  [index: string]: any
}
