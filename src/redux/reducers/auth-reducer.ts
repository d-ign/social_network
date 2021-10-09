import { Dispatch } from 'react'
import { FormAction, stopSubmit } from 'redux-form'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import authAPI from '../../api/auth-api'
import profileAPI from '../../api/profile-api'
import securityAPI from '../../api/security-api'
import { ResultCodesEnum, ResultCodeForCaptcha } from '../../api/api'

import { LoginType } from '../../types/types'

const authSlice = createSlice({
  name: 'authPage',
  initialState: {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null,
    myPhoto: null as string | null,
  },
  reducers: {
    setAuthUserData: (
      state,
      action: PayloadAction<{
        userID: number | null
        email: string | null
        login: string | null
        isAuth: boolean
      }>
    ) => {
      const { userID, email, login, isAuth } = action.payload
      state.userID = userID
      state.email = email
      state.login = login
      state.isAuth = isAuth
    },

    setCaptcha: (
      state,
      action: PayloadAction<{ captchaURL: string | null }>
    ) => {
      state.captchaURL = action.payload.captchaURL
    },

    setMyPhoto: (state, action: PayloadAction<{ myPhoto: string | null }>) => {
      state.myPhoto = action.payload.myPhoto
    },
  },
})

const { setAuthUserData, setCaptcha, setMyPhoto } = authSlice.actions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _handleError = (dispatch: Dispatch<FormAction>, response: any) => {
  if (response.resultCode === ResultCodesEnum.Error) {
    const message = response.messages
    const action = stopSubmit('loginForm', {
      _error: message.length > 0 ? message[0] : 'Some error',
    })
    // Some error - if an empty message comes from the server
    dispatch(action)
  }
}

export const getAuthUserData = createAsyncThunk(
  'authPage/getAuthUserData',
  async (_, { dispatch }) => {
    const response = await authAPI.me()

    if (response.resultCode === ResultCodesEnum.Success) {
      const { id, email, login } = response.data
      dispatch(setAuthUserData({ userID: id, email, login, isAuth: true }))
    }

    _handleError(dispatch, response)

    if (Object.keys(response.data).length !== 0) {
      const myProfile = await profileAPI.getProfile(response.data.id)
      const myPhoto = myProfile.photos.large
      dispatch(setMyPhoto({ myPhoto }))
    }
  }
)

const setCaptchaThunk = createAsyncThunk(
  'authPage/setCaptchaThunk',
  async (_, { dispatch }) => {
    const response = await securityAPI.getCaptchaURL()
    dispatch(setCaptcha({ captchaURL: response.url }))
  }
)

export const loginThunk = createAsyncThunk(
  'authPage/loginThunk',
  async (props: LoginType, { dispatch }) => {
    const { email, password, rememberMe, captcha } = props
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
      dispatch(setCaptcha({ captchaURL: null }))
    }

    _handleError(dispatch, response)

    if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(setCaptchaThunk())
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'authPage/logoutThunk',
  async (_, { dispatch }) => {
    const response = await authAPI.logout()

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(
        setAuthUserData({
          userID: null,
          email: null,
          login: null,
          isAuth: false,
        })
      )
      dispatch(setMyPhoto({ myPhoto: null }))
    }
  }
)

export default authSlice.reducer
