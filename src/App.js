import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { initializeAppThunk, showGlobalErrorThunk } from './redux/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './components/hoc/withSuspense';

import s from './App.module.css';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import GlobalError from './components/GlobalError/GlobalError';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeAppThunk();
    
    window.addEventListener('unhandledrejection',
      (event) => this.props.showGlobalErrorThunk(event.reason),
      { once: true, passive: true }
    )
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className={s.fon}>
        <div className={s.container}>

          <div className={s.appWrapper}>

            {this.props.globalError && <Redirect to="/error" />}

            <HeaderContainer />
            <Navbar />

            <div className={s.appWrapperContent}>
              <Switch>

                <Route path='/error'
                  render={() => <GlobalError error={this.props.globalError} />} />

                <Redirect from='/profile/undefined' to="/" />

                <Route path='/dialogs'
                  render={withSuspense(DialogsContainer)} />

                <Route path='/profile/:userId?'
                  component={ProfileContainer} />

                <Route path='/users'
                  render={withSuspense(UsersContainer)} />

                <Route path='/login'
                  render={() => <Login login={this.props.login} />} />

                <Redirect exact from="/" to="/profile" />

                <Redirect from='*' to="/" />

              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeAppThunk,
    showGlobalErrorThunk,
  })
)(App)

export default AppContainer;