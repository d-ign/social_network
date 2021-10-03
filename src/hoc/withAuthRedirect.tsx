import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getIsAuth } from '../redux/selectors/auth-selectors'

// WCP = WrappedComponentProps
export default function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC = (props) => {
    const isAuth = useSelector(getIsAuth)

    if (!isAuth) {
      return <Redirect to='/login' />
    }

    return <WrappedComponent {...(props as WCP)} />
  }

  return RedirectComponent
}
