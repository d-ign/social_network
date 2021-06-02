import React from 'react';
import logo from '../../img/icons/logo.svg';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

  return (
    <header className={s.header}>
      <img src={logo} alt='logo' />
      <div className={s.loginBlock}>
        {props.isAuth
          ? <>
            <span className={s.login_name}>{props.login}</span>
            <button className={s.logout} onClick={props.logoutThunk}>Выйти</button>
          </>
          : <NavLink className={s.login_link} to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header;