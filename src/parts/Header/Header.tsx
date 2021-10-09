import React, { useEffect, memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import { IconButton } from '@material-ui/core'
import s from './Header.module.scss'
import logo from '../../assets/img/icons/logo.svg'

import Avatar from '../../components/Avatar/Avatar'
import useLocalStorage from '../../services/hooks/useLocalStorage'
import { useAppDispatch, useAppSelector } from '../../services/hooks/useApp'

import {
  getAuthorizedUserID,
  getIsAuth,
  getLogin,
  getMyPhoto,
} from '../../store/selectors/auth-selectors'
import { getTheme } from '../../store/selectors/app-selectors'
import { logoutThunk } from '../../store/reducers/auth-reducer'
import { setTheme } from '../../store/reducers/app-reducer'

import { ThemeType } from '../../types/types'

const Header: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)
  const login = useAppSelector(getLogin)
  const myID = useAppSelector(getAuthorizedUserID)
  const myPhoto = useAppSelector(getMyPhoto)
  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  useLocalStorage({ key: 'theme', value: theme, action: setTheme })

  useEffect(() => {
    const colors = {
      cyan: `var(--color-cyan-${theme})`,
      cyanLight: `var(--color-cyanLight-${theme})`,
      cyanMedium: `var(--color-cyanMedium-${theme})`,
      cyanDark: `var(--color-cyanDark-${theme})`,
      darkBlue: `var(--color-darkBlue-${theme})`,
      darkBlueTransparent: `var(--color-darkBlueTransparent-${theme})`,
    }

    const keys = Object.keys(colors)
    const values = Object.values(colors)

    for (let i = 0; i < keys.length; i++) {
      document.body.style.setProperty(`--color-${keys[i]}`, values[i])
    }
  }, [theme])

  const handleToggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'theme1' ? 'theme2' : 'theme1'))
  }, [dispatch, theme])

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
