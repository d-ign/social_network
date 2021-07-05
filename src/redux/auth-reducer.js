import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state;
  }
};

const setAuthUserData = (userID, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userID, email, login, isAuth }
});
const getCaptchaURLAC = (captchaURL) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL }
});

export const getAuthUserDataThunk = () => async (dispatch) => {
  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
  }
}

const getCaptchaURLThunk = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURLAPI();
  const captcha = response.data.url;
  dispatch(getCaptchaURLAC(captcha))
}

export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserDataThunk())
    dispatch(getCaptchaURLAC(null))
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

export const logoutThunk = () => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer;