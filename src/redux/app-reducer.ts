import { getAuthUserDataThunk } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => { // initialStateType после параметров = определение, что мы возвращаем. Теперь мы не сможем написать что-то кроме ключа initialized
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}
const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeAppThunk = () => (dispatch: any) => {
  Promise.all([
    dispatch(getAuthUserDataThunk()),
    // ...
  ]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer;