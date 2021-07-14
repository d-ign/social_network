import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  }
}

type MapStatePropsType = {
  isAuth: boolean
}

// WCP - пропсы WrappedComponent
export default function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

  const RedirectComponent: React.FC<MapStatePropsType & {}> = (props) => {
    const {isAuth, ...restProps} = props;
    if (!isAuth) return <Redirect to={'/login'} />;
    return <WrappedComponent {...restProps as WCP} />
  }

  return connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
}