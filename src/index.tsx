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

      // #b2ebf2 // cyan[100]
      // like on Wall before pressing

      // #919191
      // фон светлее общего (hover и текст в profileForm)

      // #222831
      // фон header, nav, content

      // #4F4F4F
      // фон подложки

      // #5E5E5E
      // средний серый (фон статуса при редактировании)

      // #f44336
      // ошибки
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
