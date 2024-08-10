import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import gameStatusModalReducer from './reducers/gameStatus'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameStatusModal: gameStatusModalReducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
