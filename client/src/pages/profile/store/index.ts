import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileState {
  isLogin: boolean
}

const initialState: ProfileState = {
  isLogin: true
}

const profile = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    changeIsLogin(store, {payload}: PayloadAction<boolean>) {
      store.isLogin = payload
    }
  }
})

export const {changeIsLogin} = profile.actions
export default profile.reducer
