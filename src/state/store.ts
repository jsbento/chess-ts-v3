import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import gameStatusModalReducer from './reducers/gameStatusModal'
import chessMovesReducer from './reducers/chessMoves'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameStatusModal: gameStatusModalReducer,
    chessMoves: chessMovesReducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
