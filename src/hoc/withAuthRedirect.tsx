import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAppSelector } from '../hooks/useApp'
import { getIsAuth } from '../redux/selectors/auth-selectors'

// WCP = WrappedComponentProps
export default function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC = (props) => {
    const isAuth = useAppSelector(getIsAuth)

    if (!isAuth) {
      return <Redirect to='/login' />
    }

    return <WrappedComponent {...(props as WCP)} />
  }

  return RedirectComponent
}
