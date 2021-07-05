import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import withAuthRedirect from '../hoc/withAuthRedirect';

import { getUserProfile, getStatus, updateStatus, savePhotoThunk, saveProfileThunk } from '../../redux/profile-reducer';

import WallContainer from './Wall/WallContainer';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

class ProfileContainer extends React.PureComponent {
  refreshProfile() {
    
    let userId = this.props.match.params.userId;
    
    if (!userId) {
      userId = this.props.authorizedUserID;
      if (!userId) {
        this.props.history.push('/login')
      }
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps) {
    // рендер при переходе с одной страницы на другую
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <>
      <ProfileInfoContainer
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus} 
        isOwner={!this.props.match.params.userId}
        savePhotoThunk={this.props.savePhotoThunk}
        saveProfileThunk={this.props.saveProfileThunk}
        showSuccessSave={this.props.showSuccessSave}
        errorProfileContacts={this.props.errorProfileContacts}
        />
      <WallContainer />
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userID,
    isAuth: state.auth.isAuth,
    showSuccessSave: state.profilePage.showSuccessSave,
    errorProfileContacts: state.profilePage.errorProfileContacts,
  }
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhotoThunk,
    saveProfileThunk,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)