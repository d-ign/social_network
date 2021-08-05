import { AppStateType } from '../redux-store'

export const getLogin = (state: AppStateType) => state.auth.login

export const getIsAuth = (state: AppStateType) => state.auth.isAuth

export const getAuthorizedUserID = (state: AppStateType) => state.auth.userID

export const getCaptchaURL = (state: AppStateType) => state.auth.captchaURL

export const getMyPhoto = (state: AppStateType) => state.auth.myPhoto
