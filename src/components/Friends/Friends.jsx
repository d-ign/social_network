import React from 'react';
import { connect } from 'react-redux';

import {
  getFriends, follow, unfollow,
  toggleFollowingProgress
} from '../../redux/users-reducer';

import Preloader from '../common/Preloader/Preloader';
import User from '../Users/User/User';
import Search from '../Users/Search/Search';

import s from '../Users/Users.module.css';

const FriendsContainer = (props) => {
  React.useEffect(() => props.getFriends(1, 100, '', true), [props.users])

  const searchFriends = (pageNumber, term) => {
    props.getFriends(pageNumber, props.pageSize, term);
  }

  return <div className={s.wrapper}>
    {props.isFetching ? <Preloader /> : null}

    <Search
      onPageChanged={searchFriends}
      totalUsersCount={props.totalUsersCount}
    />

    {
      props.totalUsersCount === 0 &&
      <div className={s.nothingFound}>Nothing found</div>
    }

    <Friends
      friends={props.friends}
      follow={props.follow}
      unfollow={props.unfollow}
      followingInProgress={props.followingInProgress}
      authorizedUserID={props.authorizedUserID}
    />
  </div>
}

const Friends = (props) => {
  return <div className={s.container}>

    {props.friends.map(u =>
      <div key={u.id} className={s.user}>
        <User
          id={u.id}
          photo={u.photos.small}
          name={u.name}
          status={u.status}
          followed={u.followed}
          unfollow={props.unfollow}
          follow={props.follow}
          followingInProgress={props.followingInProgress}
          authorizedUserID={props.authorizedUserID}
        />
      </div>
    )}
  </div>
}

const mapDispatchToProps = (state) => {
  return {
    isFetching: state.usersPage.isFetching,
    friends: state.usersPage.friends,
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    authorizedUserID: state.auth.userID,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default connect(mapDispatchToProps, {
  getFriends,
  follow,
  unfollow,
  toggleFollowingProgress,
})(FriendsContainer)