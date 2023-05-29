import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleLogin, handleRegister } from 'http/profile'
import cache from '@/service/cache'
import type { Profile, UserProfile } from 'http/profile/interface'
import { message, notification } from 'antd'
import sleep from '@/utils/sleep'

export interface ProfileState {
  isLogin: boolean
  isLoading: boolean
  userProfile: UserProfile
}

const initialState: ProfileState = {
  isLogin: true,
  userProfile: {} as UserProfile,
  isLoading: false
}

const profile = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    changeIsLogin(store, {payload}: PayloadAction<boolean>) {
      store.isLogin = payload
    },
    handleSaveUserProfile(store, {payload}: PayloadAction<UserProfile>) {
      store.userProfile = payload
    },
    changeIsLoading(store, {payload}: PayloadAction<boolean>) {
      store.isLoading = payload
    }
  }
})

type Handle = {
  isLogin: boolean
  info: RegisterInfo | LoginInfo
}
/**
 * 用户登录或注册
 * */
export const fetchUserProfile = createAsyncThunk(
  'user/profile',
  async (infos: Handle, {dispatch}) => {
    const {isLogin, info} = infos
    let result: ResponsePayload<WithToken<Profile>> | void
    const execution = () => dispatch(changeIsLoading(false))
    message.destroy()
    if (isLogin) {
      result = await handleLogin(info).catch(
        (e: ErrorResponse) => {
          message.error(e.message.error)
          execution()
          return
        }
      )
    } else {
      result = await handleRegister(info as RegisterInfo).catch(
        (e: ErrorResponse) => {
          message.error(e.message.error)
          execution()
          return
        }
      )
    }
    await sleep(800)
    execution()
    const {
      data: {
        user,
        token
      }
    } = result as ResponsePayload<WithToken<Profile>>
    notification.open({
      placement: 'topRight',
      description: <>
        <p style={{fontSize: 'larger', marginBottom: '5px'}}>
          {isLogin ? '登录' : '注册'}成功
        </p>
        <p>世界上最遥远的距离，莫不是这屏幕之隔</p>
      </>,
      message: <h2>😆Welcome,
        <strong style={{fontWeight: 'bolder', fontSize: 'larger', color: 'pink'}}>
          [{user.nickname ? user.nickname : user.username}]
        </strong>
      </h2>,
      type: 'success'
    })
    cache.save('_user_profile', user)
    cache.save('_token', token)
    dispatch(handleSaveUserProfile(user))
  }
)

export const {changeIsLogin, handleSaveUserProfile, changeIsLoading} = profile.actions
export default profile.reducer
