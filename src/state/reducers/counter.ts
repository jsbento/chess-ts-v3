import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, incrementByAmount, decrement } = counterSlice.actions

export default counterSlice.reducer
