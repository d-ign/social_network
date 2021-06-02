import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {

  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state;
  }
};

// это action creators
const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

// это thunks
export const initializeAppThunk = () => (dispatch) => {
  // когда все асинх запросы выполняться, задиспатчить initializedSuccess
  Promise.all([
    dispatch(getAuthUserData()),
    // ...
  ]).then(() => {
    dispatch(initializedSuccess())
  })
}


export default appReducer;