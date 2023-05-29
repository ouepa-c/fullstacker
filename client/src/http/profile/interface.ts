export interface UserProfile {
  id: number
  nickname: string
  username: string
  email: string
  github: any
  qq: any
  wechat: any
  phone: any
  avatar: string
  roleId: number
  create_at: string
}

export interface Profile {
  user: UserProfile
}
