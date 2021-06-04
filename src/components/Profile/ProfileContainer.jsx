import React from 'react';
import { getUserProfile, getStatus, updateStatus, savePhotoThunk } from '../../redux/profile-reducer';
import WallContainer from './Wall/WallContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import withAuthRedirect from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  refreshProfile() {
    // параметр usetId обозначили в App, работает благодаря withRouter
    let userId = this.props.match.params.userId;
    
    if (!userId) {
      userId = this.props.authorizedUserID;
      if (!userId) {
        this.props.history.push('/login')
      }
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId); // (1) получаем статус с сервера при первичной отрисовке, getStatus взят из контекста. Затем перекидываем статус через пропсы (см. (2))
  }

  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps) {
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
      // т.е. перерисовывать только когда переходишь с одной страницы на другую
    }
  }

  render() {
    return <>
      <ProfileInfo
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus} 
        isOwner={!this.props.match.params.userId} // если есть id, значит я на чужой странице и значит я не хозяин
        savePhotoThunk={this.props.savePhotoThunk}
        />
      <WallContainer />
    </>
  }
}


// пропсы для Profile
let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status, // (2) - берём из контекста данные
    authorizedUserID: state.auth.userID,
    isAuth: state.auth.isAuth,
  }
};

// это HOC, снабжающий редиректом ProfileContainer, т.е. при отсутсвии регистрации у пользователя его будет кидать на страницу login
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// withRouter работает также как и connact - возвращает компоненту, но withRouter прикрутит еще данные из URL
// export default connect(mapStateToProps, {
//   getUserProfile
// })(withRouter(AuthRedirectComponent));

export default compose(
  connect(mapStateToProps, { // (3) - берём из импорта функции thunk-и
    getUserProfile,
    getStatus,
    updateStatus,
    savePhotoThunk,
  }),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)