import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth-reducer';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import appReducer from './app-reducer';

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;

