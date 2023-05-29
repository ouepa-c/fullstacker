import { type Action, combineReducers, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import home from 'pages/home/store/index'
import profile from 'pages/profile/store'

const root_reducer = combineReducers({
  home,
  profile
})
const reducer = persistReducer({
  key: 'root',
  storage,
  whitelist: ['profile']
}, root_reducer)

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
    }
  })
})

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunkState = { state: AppState }
export type AppThunk<R = void> = ThunkAction<R, AppState, unknown, Action<string>>

export const persistor = persistStore(store)
export default store
