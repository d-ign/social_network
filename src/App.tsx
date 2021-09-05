import React, { useEffect, lazy } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ProfileContainer from './components/Profile/ProfileContainer'
import PreloaderStart from './components/common/Preloader/PreloaderStart'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import ErrorBoundary from './components/Error/ErrorBoundary'

import withSuspense from './hoc/withSuspense'
import withAuthRedirect from './hoc/withAuthRedirect'

import s from './App.module.scss'

import { getInitialized } from './redux/selectors/app-selectors'
import { getAuthorizedUserID } from './redux/selectors/auth-selectors'
import { initializeAppThunk } from './redux/reducers/app-reducer'

const SuspendedChat = withAuthRedirect(
  withSuspense(lazy(() => import('./components/Chat/Chat')))
)
const SuspendedUsers = withAuthRedirect(
  withSuspense(lazy(() => import('./components/Users/Users')))
)
const SuspendedFriends = withAuthRedirect(
  withSuspense(lazy(() => import('./components/Friends/Friends')))
)

const App: React.FC = () => {
  const userID = useSelector(getAuthorizedUserID)
  const initialized = useSelector(getInitialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppThunk())
  }, [dispatch])

  if (!initialized) {
    return <PreloaderStart />
  }

  return (
    <div className={s.fon}>
      <div className={s.container}>
        <div className={s.appWrapper}>
          <Header />
          <Navbar />

          <div className={s.appWrapperContent}>
            <ErrorBoundary>
              <Switch>
                <Redirect from='/profile/undefined' to='/' />

                <Route
                  path='/profile/:userId'
                  render={() => <ProfileContainer />}
                />

                <Route path='/chat' render={() => <SuspendedChat />} />

                <Route path='/friends' render={() => <SuspendedFriends />} />

                <Route path='/users' render={() => <SuspendedUsers />} />

                <Route path='/login' render={() => <Login />} />

                <Redirect exact from='/' to={`/profile/${userID}`} />

                <Redirect from='*' to='/' />
              </Switch>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

const AppContainer = withRouter(App)
export default AppContainer
