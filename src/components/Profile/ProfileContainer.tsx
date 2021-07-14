import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import withAuthRedirect from '../hoc/withAuthRedirect';

import { getUserProfile, getStatus, updateStatus, savePhotoThunk, saveProfileThunk } from '../../redux/reducers/profile-reducer';

import WallContainer from './Wall/WallContainer';
import InfoContainer from './Info/InfoContainer';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router-dom';

type MapStatePropsType = {
  authorizedUserID: number | null

  profile: ProfileType | null
  status: string
  showSuccessSave: string
  errorProfileContacts: string
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void

  updateStatus: (status: string) => void
  savePhotoThunk: (file: File) => void
  saveProfileThunk: (profile: ProfileType) => void
}

type PathParamsType = {
  userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.PureComponent<PropsType> {
  refreshProfile() {

    let userId: number | null = +this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserID;
      if (!userId) {
        this.props.history.push('/login')
      }
    }

    this.props.getUserProfile(userId as number);
    this.props.getStatus(userId as number);
  }

  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps: PropsType) {
    // рендер при переходе с одной страницы на другую
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <>
      <InfoContainer
        profile={this.props.profile}
        status={this.props.status}
        showSuccessSave={this.props.showSuccessSave}
        errorProfileContacts={this.props.errorProfileContacts}

        isOwner={+this.props.match.params.userId === this.props.authorizedUserID}

        updateStatus={this.props.updateStatus}
        savePhotoThunk={this.props.savePhotoThunk}
        saveProfileThunk={this.props.saveProfileThunk}
      />
      <WallContainer />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userID,
    showSuccessSave: state.profilePage.showSuccessSave,
    errorProfileContacts: state.profilePage.errorProfileContacts,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps<PathParamsType>, AppStateType>(
    mapStateToProps,
    {
      getUserProfile,
      getStatus,
      updateStatus,
      savePhotoThunk,
      saveProfileThunk,
    }
  ),
  withRouter,
  withAuthRedirect
)(ProfileContainer)