import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import s from './Header.module.css';
import logo from '../../img/icons/logo.svg';
import logout from '../../img/icons/logout.svg';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { MapDispatchPropsType, MapStatePropsType } from './HeaderContainer';

const Header: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <NavLink className={s.logoAndTitle} to={'/profile'}>
        <img src={logo} alt='logo' />
        <span className={s.headerTitle}>Social network</span>
      </NavLink>

      <div className={s.login}>
        {props.isAuth
          ? <>
            <span className={s.loginName}>{props.login}</span>
            <span className={s.buttonDesctop}>
              <Button
                onClick={props.logoutThunk}
                variant="outlined"
                style={{ margin: 16 }}
                startIcon={<ExitToAppIcon />}>
                Log out
              </Button>
            </span>
            <span className={s.buttonMobile}>
              <Button
                onClick={props.logoutThunk}
                variant="outlined"
                style={{ margin: 16 }}
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