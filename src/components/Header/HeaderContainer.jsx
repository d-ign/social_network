import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutThunk } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
  render = () => <Header {...this.props} />
}

// это то, что придёт в контейнерную компоненту HeaderContainer, она прокинет через пропсы в функциональную компоненту Header, которая достанет их из пропсов и использует как-то
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
};
export default connect(mapStateToProps, {
  logoutThunk
})(HeaderContainer);