import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

const Header: React.FC = () => {
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const myID = useSelector(getAuthorizedUserID)
  const myPhoto = useSelector(getMyPhoto)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [themeLocal, setThemeLocal] = useState(theme)

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

  return (
    <header className={s.header}>
      <NavLink className={s.logoAndTitle} to='/profile'>
        <img src={logo} alt='logo' />
        <span className={s.headerTitleDesctop}>Social network</span>
        <span hidden className={s.headerTitleMobile}>
          SN
        </span>
      </NavLink>

      <div className={s.rightColumn}>
        {isAuth ? (
          <>
            <div className={s.loginAndPhoto}>
              <Avatar photo={myPhoto} size='small' id={myID} />
              <span className={s.loginName}>{login}</span>
            </div>

            <ButtonChangeTheme
              theme={theme}
              themeLocal={themeLocal}
              setThemeLocal={setThemeLocal}
            />

            <span className={s.buttonLogoutDesctop}>
              <Button
                onClick={() => dispatch(logoutThunk())}
                variant='outlined'
                style={{ marginRight: '12px' }}
                startIcon={<ExitToAppIcon />}
              >
                Log out
              </Button>
            </span>
            <span hidden className={s.buttonLogoutMobile}>
              <IconButton
                onClick={() => dispatch(logoutThunk())}
                aria-label='logout'
                type='submit'
              >
                <ExitToAppIcon />
              </IconButton>
            </span>
          </>
        ) : (
          <ButtonChangeTheme
            theme={theme}
            themeLocal={themeLocal}
            setThemeLocal={setThemeLocal}
          />
        )}
      </div>
    </header>
  )
}

type PropsType = {
  theme: string
  themeLocal: string
  setThemeLocal: Dispatch<SetStateAction<string>>
}

const ButtonChangeTheme: React.FC<PropsType> = (props) => {
  const { theme, themeLocal, setThemeLocal } = props
  const dispatch = useDispatch()

  const handleToggleTheme = () => {
    dispatch(actions.setTheme(themeLocal === 'theme1' ? 'theme2' : 'theme1'))
    setThemeLocal(themeLocal === 'theme1' ? 'theme2' : 'theme1')
  }

  return (
    <>
      <span className={s.buttonThemeDesctop}>
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
          type='submit'
          style={{ margin: '0 12px' }}
        >
          <InvertColorsIcon
            color={theme === 'theme1' ? 'primary' : 'secondary'}
          />
        </IconButton>
      </span>
    </>
  )
}
export default Header
