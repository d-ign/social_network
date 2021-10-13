import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/styles/theme.css'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import store from './store/store'
import App from './App'

let theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid rgba(255, 255, 255, 0.23)',
            color: 'hsla(0, 0%, 93%, 1)',
            '&:hover': {
              border: '1px solid rgba(255, 255, 255, 0.23)',
            },
          },
        },
      ],
    },
  },

  palette: {
    mode: 'dark',
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
