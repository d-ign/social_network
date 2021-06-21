import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppContainer from './App';
import store from './redux/redux-store';
import './normalize.css';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>, document.getElementById('root')
);
