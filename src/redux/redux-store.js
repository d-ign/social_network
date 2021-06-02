import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import authReducer from './auth-reducer';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

// по сути это сейчас наш state, store. getState, dispatch и subscribe встроены в Redux и называются точно также, поэтому переписывать ничего не надо в index.js и далее
let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

// создание store и передача в него reducers
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// подключение расширения от браузера гугл Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// window.store = store;

export default store;