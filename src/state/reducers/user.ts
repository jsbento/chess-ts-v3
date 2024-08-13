import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@types'

export const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
      state = action.payload
    },
    logout: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = null
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
