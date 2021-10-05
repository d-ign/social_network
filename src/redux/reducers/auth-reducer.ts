import { Dispatch } from 'react'
import { FormAction, stopSubmit } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from '../redux-store'

import authAPI from '../../api/auth-api'
import profileAPI from '../../api/profile-api'
import securityAPI from '../../api/security-api'
import { ResultCodesEnum, ResultCodeForCaptcha } from '../../api/api'

const initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
  myPhoto: null as string | null,
}

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'sn/auth/SET_MY_PHOTO':
    case 'sn/auth/SET_USER_DATA':
    case 'sn/auth/GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

const actions = {
  setAuthUserData: (
    userID: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => ({
    type: 'sn/auth/SET_USER_DATA',
    payload: {
      userID,
      email,
      login,
      isAuth,
    } as const,
  }),

  setCaptcha: (captchaURL: string | null) => ({
    type: 'sn/auth/GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaURL } as const,
  }),

  setMyPhoto: (myPhoto: string | null) => ({
    type: 'sn/auth/SET_MY_PHOTO',
    payload: { myPhoto } as const,
  }),
}

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

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.me()

  if (response.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = response.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }

  _handleError(dispatch, response)

  if (Object.keys(response.data).length !== 0) {
    const myProfile = await profileAPI.getProfile(response.data.id)
    dispatch(actions.setMyPhoto(myProfile.photos.large))
  }
}

const setCaptchaThunk = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL()
  const captcha = response.url
  dispatch(actions.setCaptcha(captcha))
}

export const loginThunk =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData())
      dispatch(actions.setCaptcha(null))
    }

    _handleError(dispatch, response)

    if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(setCaptchaThunk())
    }
  }

export const logoutThunk = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
    dispatch(actions.setMyPhoto(null))
  }
}

export default authReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
