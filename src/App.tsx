import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ProfileContainer from './pages/Profile/ProfileContainer'
import PreloaderStart from './components/Preloader/PreloaderStart'
import Header from './parts/Header/Header'
import Navbar from './parts/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Preloader from './components/Preloader/Preloader'

import s from './App.module.scss'

import { getInitialized } from './store/selectors/app-selectors'
import { getAuthorizedUserID } from './store/selectors/auth-selectors'
import { initializeApp } from './store/reducers/app-reducer'
import { useAppDispatch, useAppSelector } from './services/hooks/useApp'

const SuspendedChat = lazy(() => import('./pages/Chat/Chat'))
const SuspendedUsers = lazy(() => import('./pages/Users/UsersContainer'))
const SuspendedFriends = lazy(() => import('./pages/Friends/FriendsContainer'))

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
