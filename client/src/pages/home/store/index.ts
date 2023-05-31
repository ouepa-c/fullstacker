import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HomeState {
  counter: number
}

const initialState: HomeState = {
  counter: 10
}

const homeSlice = createSlice({
  name: 'home',
  reducers: {
    increment(state, {payload}: PayloadAction<number>) {
      state.counter += payload
    }
  },
  initialState
})

export const {increment} = homeSlice.actions
export default homeSlice.reducer
