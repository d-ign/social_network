import { reducer as formReducer } from 'redux-form'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import appReducer from './reducers/app-reducer'
import authReducer from './reducers/auth-reducer'
import chatReducer from './reducers/chat-reducer'
import usersReducer from './reducers/users-reducer'
import { profileInfoReducer } from './reducers/profile-info-reducer'
import { profileWallReducer } from './reducers/profile-wall-reducer'

const store = configureStore({
  reducer: {
    app: appReducer,
    form: formReducer,
    authPage: authReducer,
    profilePage: combineReducers({
      info: profileInfoReducer,
      wall: profileWallReducer,
    }),
    chatPage: chatReducer,
    users: usersReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export default store
