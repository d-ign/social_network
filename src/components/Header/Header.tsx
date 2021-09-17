import React, { useEffect, useState, memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import { IconButton } from '@material-ui/core'
import s from './Header.module.scss'
import logo from '../../img/icons/logo.svg'

import Avatar from '../common/Avatar/Avatar'
import useLocalStorage from '../../hooks/useLocalStorage'

import {
  getAuthorizedUserID,
  getIsAuth,
  getLogin,
  getMyPhoto,
} from '../../redux/selectors/auth-selectors'
import { getTheme } from '../../redux/selectors/app-selectors'
import { logoutThunk } from '../../redux/reducers/auth-reducer'
import { actions } from '../../redux/reducers/app-reducer'

import { ThemeType } from '../../types/types'

const Header: React.FC = () => {
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const myID = useSelector(getAuthorizedUserID)
  const myPhoto = useSelector(getMyPhoto)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [themeLocal, setThemeLocal] = useState(theme as ThemeType)

  useEffect(() => {
    const colors = {
      cyan: `var(--color-cyan-${themeLocal})`,
      cyanLight: `var(--color-cyanLight-${themeLocal})`,
      cyanMedium: `var(--color-cyanMedium-${themeLocal})`,
      cyanDark: `var(--color-cyanDark-${themeLocal})`,
      darkBlue: `var(--color-darkBlue-${themeLocal})`,
      darkBlueTransparent: `var(--color-darkBlueTransparent-${themeLocal})`,
    }

    const keys = Object.keys(colors)
    const values = Object.values(colors)

    for (let i = 0; i < keys.length; i++) {
      document.body.style.setProperty(`--color-${keys[i]}`, values[i])
    }
  }, [theme, themeLocal])

  useLocalStorage('theme', theme, actions.setTheme, setThemeLocal)

  const handleToggleTheme = useCallback(() => {
    dispatch(actions.setTheme(themeLocal === 'theme1' ? 'theme2' : 'theme1'))
    setThemeLocal(themeLocal === 'theme1' ? 'theme2' : 'theme1')
  }, [dispatch, themeLocal])

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk())
  }, [dispatch])

  return (
    <header className={s.header}>
      <Logo />
      <div className={s.rightColumn}>
        {isAuth ? (
          <>
            <div className={s.loginAndPhoto}>
              <Avatar photo={myPhoto} size='small' id={myID} />
              <span className={s.loginName}>{login}</span>
            </div>
            <ButtonChangeTheme
              theme={theme}
              handleToggleTheme={handleToggleTheme}
            />
            <ButtonLogout handleLogout={handleLogout} />
          </>
        ) : (
          <ButtonChangeTheme
            theme={theme}
            handleToggleTheme={handleToggleTheme}
          />
        )}
      </div>
    </header>
  )
}

const Logo: React.FC = memo(() => (
  <NavLink className={s.logoAndTitle} to='/profile'>
    <img src={logo} alt='logo' />
    <span className={s.headerTitleDesktop}>Social network</span>
    <span hidden className={s.headerTitleMobile}>
      SN
    </span>
  </NavLink>
))

type ButtonChangeThemePropsType = {
  theme: ThemeType
  handleToggleTheme: () => void
}

const ButtonChangeTheme: React.FC<ButtonChangeThemePropsType> = ({
  theme,
  handleToggleTheme,
}) => (
  <>
    <span className={s.buttonThemeDesktop}>
      <Button
        color={theme === 'theme1' ? 'primary' : 'secondary'}
        style={{ padding: '6px 12px', marginRight: '12px' }}
        onClick={handleToggleTheme}
        startIcon={<InvertColorsIcon />}
      >
        Change theme
      </Button>
    </span>

    <span hidden className={s.buttonThemeMobile}>
      <IconButton
        onClick={handleToggleTheme}
        aria-label='changeTheme'
        style={{ margin: '0 12px' }}
        title='Change theme'
      >
        <InvertColorsIcon
          color={theme === 'theme1' ? 'primary' : 'secondary'}
        />
      </IconButton>
    </span>
  </>
)

const ButtonLogout: React.FC<{ handleLogout: () => void }> = memo(
  ({ handleLogout }) => (
    <>
      <span className={s.buttonLogoutDesktop}>
        <Button
          onClick={handleLogout}
          variant='outlined'
          style={{ marginRight: '12px' }}
          startIcon={<ExitToAppIcon />}
        >
          Log out
        </Button>
      </span>
      <span hidden className={s.buttonLogoutMobile}>
        <IconButton title='Logout of profile' onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </span>
    </>
  )
)

export default Header
