import axios from 'axios'

export const instance = axios.create({
  withCredentials: true, // цепляем cookie к запросу
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'ddfbc45b-6923-498e-99d5-3a4897cbb31f',
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
