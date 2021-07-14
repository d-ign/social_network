import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getFriends, follow, unfollow } from '../../redux/reducers/users-reducer';

import s from '../Users/Users.module.css';
import Preloader from '../common/Preloader/Preloader';
import User from '../Users/User/User';
import Search from '../Users/Search/Search';

import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import withAuthRedirect from '../hoc/withAuthRedirect';

type MapStatePropsType = {
  isFetching: boolean
  pageSize: number
  totalUsersCount: number
  authorizedUserID: number | null
  followingInProgress: Array<number>
  friends: Array<UserType>
  users: Array<UserType>
}
type MapDispatchPropsType = {
  getFriends: (pageNumber: number, pageSize: number, term: string, friend: boolean) => void
  unfollow: (id: number) => void
  follow: (id: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const FriendsContainer: React.FC<PropsType> = ({ users, getFriends, ...props }) => {
  React.useEffect(() => getFriends(1, 100, '', true), [getFriends, users])

  const searchFriends = (pageNumber: number, term: string) => {
    getFriends(pageNumber, props.pageSize, term, true);
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

    <div className={s.container}>
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
  </div>
}

const mapDispatchToProps = (state: AppStateType): MapStatePropsType => {
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

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapDispatchToProps,
    {
      getFriends,
      follow,
      unfollow,
    }
  ),
  withAuthRedirect
)(FriendsContainer)
