import { getAuthUserDataThunk } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SHOW_GLOBAL_ERROR = 'SHOW_GLOBAL_ERROR';

let initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action) => {

  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      }
    }
    case SHOW_GLOBAL_ERROR: {
      return {
        ...state,
        globalError: action.reason,
      }
    }
    default:
      return state;
  }
};

const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
const showGlobalErrorAC = (reason) => ({ type: SHOW_GLOBAL_ERROR, reason });

export const initializeAppThunk = () => (dispatch) => {
  Promise.all([
    dispatch(getAuthUserDataThunk()),
    // ...
  ]).then(() => {
    dispatch(initializedSuccess())
  })
}

export const showGlobalErrorThunk = (reason) => (dispatch) => {
  dispatch(showGlobalErrorAC(reason))
}

export default appReducer;