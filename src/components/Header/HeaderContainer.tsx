import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutThunk } from '../../redux/reducers/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';

export type MapStatePropsType = {
  isAuth: boolean
  login: string | null
}

export type MapDispatchPropsType = {
  logoutThunk: () => void
}

const HeaderContainer: React.FC<MapStatePropsType & MapDispatchPropsType> =
  (props) => {
    return <Header {...props} />
  }

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapStateToProps, { logoutThunk }
  ))(HeaderContainer);