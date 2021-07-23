import { ResultCodesEnum, ResultCodeForCaptcha } from '../../api/api';
import { authAPI } from '../../api/auth-api';
import { securityAPI } from '../../api/security-api';

import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../redux-store';
import { profileAPI } from '../../api/profile-api';

let initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
  myPhoto: null as string | null,
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'SET_MY_PHOTO': {
      return {
        ...state,
        // @ts-ignore
        myPhoto: action.payload.photo,
      }
    }
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: { userID, email, login, isAuth } as const
  }),

  setCaptcha: (captchaURL: string | null) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaURL } as const
  }),

  setMyPhoto: (photo: string | null) => ({
    type: 'SET_MY_PHOTO',
    payload: { photo } as const
  }),
}

export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me();

  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
  
  const myProfile = await profileAPI.getProfile(response.data.id);
  dispatch(actions.setMyPhoto(myProfile.photos.large));
}

const setCaptchaThunk = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captcha = response.url;
  dispatch(actions.setCaptcha(captcha))
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserDataThunk())
    dispatch(actions.setCaptcha(null))
  }

  if (response.resultCode === ResultCodesEnum.Error) {
    const message = response.messages;
    const action = stopSubmit('loginForm', {
      _error: message.length > 0 ? message[0] : 'Some error'
    });
    // Some error - на всякий случай, если с сервера придёт пустое сообщение при ошибке
    dispatch(action);
  }

  if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
    dispatch(setCaptchaThunk())
  }
}

export const logoutThunk = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;