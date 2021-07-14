import { BaseThunkType, InferActionsTypes } from '../redux-store';

import { getAuthUserDataThunk } from './auth-reducer';

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state;
  }
}

const actions = {
  initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),
}

export const initializeAppThunk = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserDataThunk())
  dispatch(actions.initializedSuccess())
}

export default appReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;