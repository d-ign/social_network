import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import authReducer from './reducers/auth-reducer'
import profileReducer from './reducers/profile-reducer'
import usersReducer from './reducers/users-reducer'
import appReducer from './reducers/app-reducer'
import chatReducer from './reducers/chat-reducer'

const rootReducer = combineReducers({
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  chat: chatReducer,
})

// types state app
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// types actions
export type InferActionsTypes<T> = T extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

// type thunks
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>

// @ts-ignore because of Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
