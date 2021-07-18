import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router-dom';
import { getUserProfile, getStatus } from '../../redux/reducers/profile-reducer';

import withAuthRedirect from '../hoc/withAuthRedirect';
import WallContainer from './Wall/WallContainer';
import InfoContainer from './Info/InfoContainer';

type MapStatePropsType = {
  authorizedUserID: number | null
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
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
        isOwner={+this.props.match.params.userId === this.props.authorizedUserID}
      />
      <WallContainer />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    authorizedUserID: state.auth.userID,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps<PathParamsType>, AppStateType>(
    mapStateToProps,
    {
      getUserProfile,
      getStatus,
    }
  ),
  withRouter,
  withAuthRedirect
)(ProfileContainer)