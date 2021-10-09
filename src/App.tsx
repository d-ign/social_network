import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ProfileContainer from './components/Profile/ProfileContainer'
import PreloaderStart from './components/common/Preloader/PreloaderStart'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import ErrorBoundary from './components/Error/ErrorBoundary'
import Preloader from './components/common/Preloader/Preloader'

import s from './App.module.scss'

import { getInitialized } from './redux/selectors/app-selectors'
import { getAuthorizedUserID } from './redux/selectors/auth-selectors'
import { initializeApp } from './redux/reducers/app-reducer'
import { useAppDispatch, useAppSelector } from './hooks/useApp'

const SuspendedChat = lazy(() => import('./components/Chat/Chat'))
const SuspendedUsers = lazy(() => import('./components/Users/UsersContainer'))
const SuspendedFriends = lazy(
  () => import('./components/Friends/FriendsContainer')
)

const App: React.FC = () => {
  const userID = useAppSelector(getAuthorizedUserID)
  const initialized = useAppSelector(getInitialized)
  const dispatch = useAppDispatch()

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

                  <Route path='/login' render={() => <Auth />} />

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
