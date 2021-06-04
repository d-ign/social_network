import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET-USER-DATA';

let initialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA: {
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

// это thunks
export const getAuthUserData = () => async (dispatch) => {
  // return выкинет промис после then наружу в initializeAppThunk
  let response = await authAPI.me();
  
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    // диспатчим тогда наши авторизационные данные
    dispatch(setAuthUserData(id, email, login, true))
  }
}


export const loginThunk = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
        let message = response.data.messages;
        let action = stopSubmit(
          'loginForm',
          { _error: message.length > 0 ? message[0] : 'Some error' }); // stopSubmit - функция от redux-form, loginForm - имя формы из Login, Some error - на всякий случай, если с сервера придёт путое сообщение при ошибке
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