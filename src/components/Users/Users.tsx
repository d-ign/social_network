import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/selectors/users-selectors';
import { getAuthorizedUserID } from '../../redux/selectors/auth-selectors';
import { actions, follow, getUsers, unfollow } from '../../redux/reducers/users-reducer';

import User from './User/User';
import Search from './Search/Search';

import s from './Users.module.css';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type PathParamsType = {
  pathname: string
}

const Users: React.FC<{} & {} & RouteComponentProps<PathParamsType>> = ({location: {pathname}}) => {

  // for User
  const followingInProgress = useSelector(getFollowingInProgress)
  const authorizedUserID = useSelector(getAuthorizedUserID)

  // for Search
  const searchUsers = (term: string) => {
    setTermForMoreUsersButton(term)
    setPageNumber(1)

    if (pathname === '/friends') {
      dispatch(getUsers(1, term, true))
    }
    if (pathname === '/users') {
      dispatch(getUsers(1, term))
    }

    if (maxPageCount === pageNumber) {
      setIsShowMoreUsersButton(false)
    }
    if (maxPageCount > pageNumber) {
      setIsShowMoreUsersButton(true)
    }
  }

  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsersSelector)
  const isFetching = useSelector(getIsFetching)
  const dispatch = useDispatch()

  let maxPageCount = Math.ceil(totalUsersCount / pageSize);
  let [pageNumber, setPageNumber] = useState(1);

  let [termForMoreUsersButton, setTermForMoreUsersButton] = useState('');
  let [isShowMoreUsersButton, setIsShowMoreUsersButton] = useState(true);

  React.useEffect(() => {
    totalUsersCount > pageSize
      ? setIsShowMoreUsersButton(true)
      : setIsShowMoreUsersButton(false)
  }, [maxPageCount])

  React.useEffect(() => {
    dispatch(actions.clearUsers())
    setIsShowMoreUsersButton(true)
    setPageNumber(1)
    setTermForMoreUsersButton('')

    if (pathname === '/friends') {
      dispatch(getUsers(1, '', true))
    }
    if (pathname === '/users') {
      dispatch(getUsers(1, ''))
    }
  }, [pathname])

  const handleShowMoreUsers = () => {
    if (maxPageCount > pageNumber) {
      setPageNumber(++pageNumber)

      if (pathname === '/friends') {
        dispatch(getUsers(pageNumber, termForMoreUsersButton, true));
      }
      if (pathname === '/users') {
        dispatch(getUsers(pageNumber, termForMoreUsersButton));
      }
    }
    if (maxPageCount === pageNumber) {
      setIsShowMoreUsersButton(false)
    }
  }

  return <div className={s.wrapper}>
    <Search
      searchUsers={searchUsers}
      totalUsersCount={totalUsersCount}
      pathname={pathname}
    />

    {
      totalUsersCount === 0 && !isFetching &&
      <div className={s.nothingFound}>Nothing found</div>
    }

    <div className={s.container}>
      <div className={s.wrapUsers}>
        {users.map(u =>
          <div key={u.id} className={s.user}>
            <User
              id={u.id}
              photo={u.photos.small}
              name={u.name}
              status={u.status}
              followed={u.followed}
              unfollow={(id: number) => dispatch(unfollow(id))}
              follow={(id: number) => dispatch(follow(id))}
              followingInProgress={followingInProgress}
              authorizedUserID={authorizedUserID}
            />
          </div>
        )}
      </div>

      {<div className={cn(s.buttonLoadMore, {
        [s.hiddenButtonLoadMore]: !isShowMoreUsersButton
      })}>
        <IconButton
          aria-label="load more users"
          onClick={handleShowMoreUsers}
        ><ExpandMoreIcon />
        </IconButton>
      </div>
      }
    </div>
  </div>
}

export default withRouter(Users);