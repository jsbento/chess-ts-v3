import { createSlice } from '@reduxjs/toolkit'

export const chessMovesSlice = createSlice({
  name: 'chessMoves',
  initialState: [] as string[],
  reducers: {
    addMove: (state, action) => {
      state = [...state, action.payload]
    },
    clearMoves: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = []
    },
  },
})

export const { addMove, clearMoves } = chessMovesSlice.actions

export default chessMovesSlice.reducer
