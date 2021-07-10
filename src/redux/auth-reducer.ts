import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        user: '12', // ? почему не падает
        ...state,
        ...action.payload,
      }
    }
    default:
      return state;
  }
};

type setAuthUserDataActionPayloadType = {
  userID: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataActionPayloadType
}
const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userID, email, login, isAuth }
});

type getCaptchaURLActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaURL: string | null }
}
const getCaptchaURL = (captchaURL: string | null): getCaptchaURLActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL }
});

export const getAuthUserDataThunk = () => async (dispatch: any) => {
  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
  }
}

const getCaptchaURLThunk = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaURLAPI();
  const captcha = response.data.url;
  dispatch(getCaptchaURL(captcha))
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserDataThunk())
    dispatch(getCaptchaURL(null))
  }

  if (response.data.resultCode === 1) {
    const message = response.data.messages;
    const action = stopSubmit('loginForm', {
      _error: message.length > 0 ? message[0] : 'Some error'
    });
    // Some error - на всякий случай, если с сервера придёт пустое сообщение при ошибке
    dispatch(action);
  }

  if (response.data.resultCode === 10) {
    dispatch(getCaptchaURLThunk())
  }
}

export const logoutThunk = () => async (dispatch: any) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer;