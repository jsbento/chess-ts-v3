import { createSlice } from '@reduxjs/toolkit'

export const chessMovesSlice = createSlice({
  name: 'chessMoves',
  initialState: {
    moves: [] as string[],
  },
  reducers: {
    addMove: (state, action) => {
      state.moves.push(action.payload)
    },
    clearMoves: (state) => {
      state.moves = []
    },
  },
})

export const { addMove, clearMoves } = chessMovesSlice.actions

export default chessMovesSlice.reducer
