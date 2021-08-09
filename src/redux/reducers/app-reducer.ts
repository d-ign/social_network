import { BaseThunkType, InferActionsTypes } from '../redux-store'
import { getAuthUserDataThunk } from './auth-reducer'

type themeType = 'theme1' | 'theme2'

const initialState = {
  initialized: false,
  theme: 'theme1',
}

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true,
      }
    }
    case 'TOGGLE_THEME': {
      return {
        ...state,
        theme: action.theme,
      }
    }
    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),
  setTheme: (theme: themeType) => ({ type: 'TOGGLE_THEME', theme } as const),
}

export const initializeAppThunk = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserDataThunk())
  dispatch(actions.initializedSuccess())
}

export default appReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
