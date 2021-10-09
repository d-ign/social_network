import { RootStateType } from '../redux-store'

export const getLogin = (state: RootStateType) => state.authPage.login

export const getIsAuth = (state: RootStateType) => state.authPage.isAuth

export const getAuthorizedUserID = (state: RootStateType) =>
  state.authPage.userID

export const getCaptchaURL = (state: RootStateType) => state.authPage.captchaURL

export const getMyPhoto = (state: RootStateType) => state.authPage.myPhoto
