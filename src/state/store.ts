import { configureStore, Reducer } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

import {
  counterReducer,
  gameStatusModalReducer,
  chessMovesReducer,
  authReducer,
} from '@reducers'

const persistUserConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
}

const store = configureStore({
  devTools: import.meta.env.MODE !== 'production',
  reducer: {
    counter: counterReducer,
    gameStatusModal: gameStatusModalReducer,
    chessMoves: chessMovesReducer,
    auth: persistReducer(persistUserConfig, authReducer as Reducer),
  },
})
export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
