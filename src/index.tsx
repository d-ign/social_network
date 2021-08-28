import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './styles/theme.css'
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from './redux/redux-store'
import AppContainer from './App'

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    // цвет главных кнопок, активных ссылок в навигации,
    // декоративных линий, рамок у форм
    primary: {
      main: '#00bcd4',
      // 1-ая тема, синий цвет
    },
    secondary: {
      main: '#00d482',
      // 2-ая тема, зелёный цвет
    },
  },
})

theme = responsiveFontSizes(theme)

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <AppContainer />
      </Provider>
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('root')
)
