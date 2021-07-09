import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  follow, unfollow, setCurrentPage,
  toggleFollowingProgress, getUsers, clearUsers, getFoundUsers
} from '../../redux/users-reducer';
import {
  getUsersSelector, getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching, getFollowingInProgress
} from '../../redux/users-selectors';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../hoc/withAuthRedirect';

class UsersContainer extends React.Component {

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize, '');
  }

  onPageChanged = (pageNumber, term) => {
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
        totalUsersCount={this.props.totalUsersCount}
        isFetching={this.props.isFetching}
        currentPage={this.props.currentPage}
        pageSize={this.props.pageSize}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        foundUsers={this.props.foundUsers}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
        authorizedUserID={this.props.authorizedUserID}
        getFoundUsers={this.props.getFoundUsers}
      />
    </>
  }
}

let mapStateToProps = (state) => {
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

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
    clearUsers,
    getFoundUsers,
  }),
  withAuthRedirect
)(UsersContainer)
