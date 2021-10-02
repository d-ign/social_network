import axios from 'axios'

export const instance = axios.create({
  withCredentials: true, // attach a cookie to the request
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type DefaultResponseType<D = never, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string> | string
}
