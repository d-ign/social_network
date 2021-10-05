import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ProfileContainer from './components/Profile/ProfileContainer'
import PreloaderStart from './components/common/Preloader/PreloaderStart'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import ErrorBoundary from './components/Error/ErrorBoundary'
import Preloader from './components/common/Preloader/Preloader'

import s from './App.module.scss'

import { getInitialized } from './redux/selectors/app-selectors'
import { getAuthorizedUserID } from './redux/selectors/auth-selectors'
import { initializeApp } from './redux/reducers/app-reducer'

const SuspendedChat = lazy(() => import('./components/Chat/Chat'))
const SuspendedUsers = lazy(() => import('./components/Users/UsersContainer'))
const SuspendedFriends = lazy(
  () => import('./components/Friends/FriendsContainer')
)

const App: React.FC = () => {
  const userID = useSelector(getAuthorizedUserID)
  const initialized = useSelector(getInitialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
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
              <Suspense fallback={<Preloader display='default' />}>
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
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
