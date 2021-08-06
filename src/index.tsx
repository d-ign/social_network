import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import cyan from '@material-ui/core/colors/cyan'
import AppContainer from './App'
import store from './redux/redux-store'

let theme = createMuiTheme({
  palette: {
    type: 'dark', // светлый текст
    primary: {
      main: cyan[600], // #00bcd4
      // синий цвет (кнопки, активные ссылки в навигации, декоративные линии)
    },
    secondary: {
      main: cyan[800], // #00838f
      // кнопка в Login для входа в тестовый аккаунт
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
