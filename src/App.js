import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { initializeAppThunk } from './redux/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './components/hoc/withSuspense';

import s from './App.module.css';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import FriendsContainer from './components/Friends/Friends';
import ErrorBoundary from './components/Error/ErrorBoundary';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const App = (props) => {

  React.useEffect(() => props.initializeAppThunk(), []);

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
                  render={withSuspense(DialogsContainer)} />

                <Route path='/profile/:userId'
                  component={ProfileContainer} />

                <Route path='/users'
                  render={withSuspense(UsersContainer)} />

                <Route path='/friends'
                  render={() => <FriendsContainer />} />

                <Route path='/login'
                  render={() => <Login login={props.login} />} />

                <Redirect exact from="/" to={'/profile/' + props.authorizedUserID} />

                <Redirect from='*' to="/" />
              </Switch>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  authorizedUserID: state.auth.userID,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeAppThunk,
  })
)(App)

export default AppContainer;