import { instance } from './api';

type GetCaptchaResponseType = {
  url: string
}

export const securityAPI = {
  async getCaptchaURL() {
    const response = await instance.get<GetCaptchaResponseType>(`security/get-captcha-url`);
    return response.data;
  },
}