import { AppStateType } from "../redux-store";

export const getLogin = (state: AppStateType) => {
  return state.auth.login
}

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getAuthorizedUserID = (state: AppStateType) => {
  return state.auth.userID
}

export const getCaptchaURL = (state: AppStateType) => {
  return state.auth.captchaURL
}