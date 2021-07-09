import { getAuthUserDataThunk } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false,
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

const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeAppThunk = () => (dispatch) => {
  Promise.all([
    dispatch(getAuthUserDataThunk()),
    // ...
  ]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer;