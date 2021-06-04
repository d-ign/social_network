import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeAppThunk } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { withSuspense } from './components/hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // в конечный bundle эта компонента не попадёт, а подгрузится, если будет надо, при переходе на диалоги
// import UsersContainer from './components/Users/UsersContainer';
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
// увеличиваем скорость стартовой загрузки и замедляем затем использование

class App extends React.Component {
  componentDidMount() {
    this.props.initializeAppThunk();
  }
  // (2)

  render() {
    // сначала сработает Preloader, даст время проининциализироваться initializeAppThunk (см. componentDidMount), затем пойдем в JSX
    // (1)
    if (!this.props.initialized) {
      return <Preloader />
    }

    // (3)
    return (
      <div className="container">
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Switch>

              {/* редирект подставляет в урл свою часть (т.е. перенаправялет на нужную страницу), а роут с таким-то адресом отрисовывает ту компоненту, которая указана в render */}

              {/* <Route path='/' exact
                     render={() => <ProfileContainer />} /> */}
              <Redirect exact from="/" to="/profile" />

              <Route path='/dialogs'
                render={withSuspense(DialogsContainer)} />

                  {/* // return <Suspense fallback={<div>Загрузка...</div>}>
                  //   <DialogsContainer />
                  // </Suspense> */}
                

              {/* userId - параметр, мы можем его достать благодаря import { withRouter } from 'react-router'; в контейнерной компоненте ProfileContainer, ? - значит что параметр необязательный; текущий URL - это второй источник истины после store*/}

              <Route path='/profile/:userId?'
                render={() => <ProfileContainer />} />

              <Route path='/users'
                render={withSuspense(UsersContainer)} />

              {/* <Route path='/users'
                render={() => {
                  return <Suspense fallback={<div>Загрузка...</div>}>
                    <UsersContainer />
                  </Suspense>
                }} /> */}

              <Route path='/login'
                render={() => <Login login={this.props.login} />} />

              {/* <Route exact path='/login' render={() => <Login login={this.props.login} />} /> */}
              {/* exact означает что урл должен быть точь в точь такой, как указан. Если после login что-то еще будет, то Route не сработает. Без exact будет срабатывать и при урл login и при login/что-то еще */}
              {/* или можно Route в Switch: <Switch> <Route ... </Switch>. Он как только находит нужный url просто дальше (ниже) не проверяет и выводит первое, что нашёл */}

              {/* <Route patch='*' 
                     render={() => <div> 404 </div>} /> */}
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

// compose - функция, которая одним за одним выполняет HOC, оборачивая всё больше и больше нашу презентационную компоненту, наделяя её какой-то функциональностью, данными
let AppContainer = compose(
  withRouter, // берем инфу из урла
  connect(mapStateToProps, {
    initializeAppThunk
  })
)(App)

let SamuraiJSApp = (props) => {
  // провайдер создает контекст; компонента может брать инфу из пропсов, своего состояния и контекста
  return (
    <BrowserRouter basemname={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp;