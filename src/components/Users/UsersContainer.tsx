import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/reducers/users-reducer';
import { follow, unfollow, getUsers, getFoundUsers } from '../../redux/reducers/users-reducer';
import {
  getUsersSelector, getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching, getFollowingInProgress
} from '../../redux/users-selectors';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  followingInProgress: Array<number>
  authorizedUserID: number | null
  users: Array<UserType>
  foundUsers: Array<UserType>
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number, term: string) => void
  getFoundUsers: (pageNumber: number, pageSize: number, term: string) => void
  setCurrentPage: (pageNumber: number) => void
  unfollow: (id: number) => void
  follow: (id: number) => void
  clearUsers: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize, '');
  }

  onPageChanged = (pageNumber: number, term: string) => {
    this.props.getUsers(pageNumber, this.props.pageSize, term);
    this.props.setCurrentPage(pageNumber);
  }

  componentWillUnmount() {
    this.props.clearUsers();
    this.props.setCurrentPage(1);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}

      <Users
        users={this.props.users}
        foundUsers={this.props.foundUsers}
        pageSize={this.props.pageSize}
        totalUsersCount={this.props.totalUsersCount}
        isFetching={this.props.isFetching}
        followingInProgress={this.props.followingInProgress}
        authorizedUserID={this.props.authorizedUserID}

        onPageChanged={this.onPageChanged}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        getFoundUsers={this.props.getFoundUsers}
      />
    </>
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersSelector(state),
    foundUsers: state.usersPage.foundUsers,
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    authorizedUserID: state.auth.userID,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapStateToProps,
    {
      setCurrentPage: actions.setCurrentPage,
      clearUsers: actions.clearUsers,
      follow,
      unfollow,
      getFoundUsers,
      getUsers,
    }
  ),
  withAuthRedirect
)(UsersContainer)
