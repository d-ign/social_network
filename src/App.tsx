import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { AppStateType } from './redux/redux-store';
import { initializeAppThunk } from './redux/reducers/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './components/hoc/withSuspense';

import s from './App.module.css';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import ErrorBoundary from './components/Error/ErrorBoundary';

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(
  () => import('./components/Users/UsersContainer'));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedUsers = withSuspense(UsersContainer);

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = (
  {initializeAppThunk, ...props}) => {

  React.useEffect(() => initializeAppThunk(), [initializeAppThunk]);

  if (!props.initialized) {
    return <Preloader />
  }

  return (
    <div className={s.fon}>
      <div className={s.container}>
        <div className={s.appWrapper}>

          <HeaderContainer />
          <Navbar />

          <div className={s.appWrapperContent}>
            <ErrorBoundary>
              <Switch>
                <Redirect from='/profile/undefined' to="/" />

                <Route path='/dialogs'
                  render={() => <SuspendedDialogs />} />

                <Route path='/profile/:userId'
                  render={() => <ProfileContainer />} />

                <Route path='/users'
                  render={() => <SuspendedUsers />} />

                <Route path='/friends'
                  render={() => <SuspendedUsers />} />

                <Route path='/login'
                  render={() => <Login />} />

                <Redirect exact from="/" to={'/profile/' + props.userID} />

                <Redirect from='*' to="/" />
              </Switch>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  userID: state.auth.userID,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeAppThunk,
  })
)(App)

export default AppContainer;
 
type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = { initializeAppThunk: () => void }