import axios from 'axios';

export const instance = axios.create({
  withCredentials: true, // цепляем cookie к запросу
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9fe42175-1733-4793-9c3f-72022637a8a0'
  }
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type DefaultResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string> | string
}