import { BaseThunkType, InferActionsTypes } from '../redux-store'
import { getAuthUserData } from './auth-reducer'
import { ThemeType } from '../../types/types'

const initialState = {
  initialized: false,
  theme: 'theme1' as ThemeType,
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
  setTheme: (theme: ThemeType) => ({ type: 'TOGGLE_THEME', theme } as const),
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData())
  dispatch(actions.initializedSuccess())
}

export default appReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
