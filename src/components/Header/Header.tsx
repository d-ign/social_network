import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import s from './Header.module.css';
import logo from '../../img/icons/logo.svg';
import logout from '../../img/icons/logout.svg';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/reducers/auth-reducer';
import { getIsAuth, getLogin } from '../../redux/selectors/auth-selectors';

const Header: React.FC = (props) => {

  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const dispatch = useDispatch()

  const stylesLogoutButton = {
    margin: 16
  }

  return (
    <header className={s.header}>
      <NavLink className={s.logoAndTitle} to={'/profile'}>
        <img src={logo} alt='logo' />
        <span className={s.headerTitle}>Social network</span>
      </NavLink>

      <div className={s.login}>
        {isAuth
          ? <>
            <span className={s.loginName}>{login}</span>
            <span className={s.buttonDesctop}>
              <Button
                onClick={() => dispatch(logoutThunk())}
                variant="outlined"
                style={stylesLogoutButton}
                startIcon={<ExitToAppIcon />}>
                Log out
              </Button>
            </span>
            <span className={s.buttonMobile}>
              <Button
                onClick={() => dispatch(logoutThunk())}
                variant="outlined"
                style={stylesLogoutButton}
              ><img src={logout} alt="logout" />
              </Button>
            </span>
          </>
          : <Redirect to="/login" />
        }
      </div>
    </header>
  )
}

export default Header;