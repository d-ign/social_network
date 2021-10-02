import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './styles/theme.css'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from './redux/redux-store'
import App from './App'

let theme = createTheme({
  palette: {
    type: 'dark',
    // color of main buttons, active links in navigation,
    // decorative lines, borders for forms elements
    primary: {
      main: '#00bcd4',
      // 1st theme, blue
    },
    secondary: {
      main: '#00d482',
      // 2nd theme, green
    },
  },
})

theme = responsiveFontSizes(theme)

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('root')
)
