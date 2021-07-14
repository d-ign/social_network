import { DefaultResponseType, instance, ResultCodeForCaptcha, ResultCodesEnum } from './api';

type MeDataType = {
  id: number
  email: string
  login: string
}

export const authAPI = {
  async me() {
    const response = await instance.get<DefaultResponseType<MeDataType>>(`auth/me`);
    // const response = await instance.get(`auth/me`);
    // debugger
    return response.data;
  },
  async login(email: string, password: string,
    rememberMe = false, captcha: null | string = null
  ) {
    const response = await instance.post<DefaultResponseType<{ userId: number }, ResultCodesEnum | ResultCodeForCaptcha>>(
      '/auth/login', {
      email, password, rememberMe, captcha
    });
    return response.data;
  },
  async logout() {
    const response = await instance.delete<DefaultResponseType>('/auth/login');
    return response.data;
  }
}