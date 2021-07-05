import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/redux-store';

import AppContainer from './App';

import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import cyan from '@material-ui/core/colors/cyan';

let theme = createMuiTheme({
  palette: {
    type: 'dark', // светлый текст
    primary: {
      main: cyan[600], // #00bcd4
      // синий цвет (кнопки, активные ссылки в навигации, декоративные линии)
    },
    secondary: {
      main: '#4F4F4F',
      // общий фон
    },
    
    // #919191
    // фон светлее общего (hover и текст в profileForm)

    // #5E5E5E
    // средний серый (фон статуса при редактировании)
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <AppContainer />
      </Provider>
    </ThemeProvider>
  </HashRouter>, document.getElementById('root')
);
