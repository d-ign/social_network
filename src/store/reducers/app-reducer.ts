import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getAuthUserData } from './auth-reducer'
import { ThemeType } from '../../types/types'

const appSlice = createSlice({
  name: 'app',

  initialState: {
    initialized: false,
    theme: 'theme1' as ThemeType,
  },

  reducers: {
    initializedSuccess: (state) => {
      state.initialized = true
    },

    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload
    },
  },
})

export const { initializedSuccess, setTheme } = appSlice.actions

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (_, { dispatch }) => {
    await dispatch(getAuthUserData())

    dispatch(initializedSuccess())
  }
)

export default appSlice.reducer
