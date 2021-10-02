import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
})

type MapStatePropsType = {
  isAuth: boolean
}

// WCP = WrappedComponentProps
export default function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapStatePropsType & unknown> = (props) => {
    const { isAuth, ...restProps } = props

    if (!isAuth) return <Redirect to='/login' />

    return <WrappedComponent {...(restProps as WCP)} />
  }

  return connect<MapStatePropsType, never, WCP, AppStateType>(
    mapStateToPropsForRedirect
  )(RedirectComponent)
}
