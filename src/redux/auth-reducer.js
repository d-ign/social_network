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
        ...action.payload, // перезатрёт данные в state
      }
    }
    default:
      return state;
  }
};

// это action creators
const setAuthUserData = (userID, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userID, email, login, isAuth }
});
const getCaptchaURLAC = (captchaURL) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaURL}
});

// это thunks
export const getCaptchaURLThunk = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURLAPI();
  const captcha = response.data.url;
  dispatch(getCaptchaURLAC(captcha))
}

export const getAuthUserData = () => async (dispatch) => {
  // return выкинет промис после then наружу в initializeAppThunk
  let response = await authAPI.me();
  
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    // диспатчим тогда наши авторизационные данные
    dispatch(setAuthUserData(id, email, login, true))
  }
}


export const loginThunk = (email, password, rememberMe, captcha) => (dispatch) => {
  authAPI.login(email, password, rememberMe, captcha)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaURLThunk())
        }
        let message = response.data.messages;
        let action = stopSubmit(
          'loginForm',
          { _error: message.length > 0 ? message[0] : 'Some error' }); // stopSubmit - функция от redux-form, loginForm - имя формы из Login, Some error - на всякий случай, если с сервера придёт пустое сообщение при ошибке
        dispatch(action);
      }
    })
}


export const logoutThunk = () => (dispatch) => {
  authAPI.logout()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
    })
}


export default authReducer;