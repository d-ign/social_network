import React, { useState, useEffect, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import s from './Users.module.scss'

import User from '../common/User/User'
import Search from '../common/Search/Search'
import NoElement from '../common/NoElement/NoElement'

import useQueryUrl from '../../hooks/useQueryUrl'

import {
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../redux/selectors/users-selectors'
import { getUsers } from '../../redux/reducers/users-reducer'

import { UserType } from '../../types/types'

const Users: React.FC = () => {
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsersSelector)
  const isFetching = useSelector(getIsFetching)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const maxPageCount = Math.ceil(totalUsersCount / pageSize)

  const [isShowMoreUsersButton, setIsShowMoreUsersButton] = useState(true)
  // eslint-disable-next-line prefer-const
  let [pageNumber, setPageNumber] = useState(1)
  const { termOfUrl, setTermOfUrl } = useQueryUrl(pathname)

  // for Search
  const searchUsers = useCallback(
    (term: string) => {
      setPageNumber(1)
      setTermOfUrl(term)
      dispatch(getUsers(1, term))

      if (maxPageCount === pageNumber) {
        setIsShowMoreUsersButton(false)
      }
      if (maxPageCount > pageNumber) {
        setIsShowMoreUsersButton(true)
      }
    },
    [dispatch, maxPageCount, pageNumber, setTermOfUrl]
  )

  useEffect(() => {
    if (totalUsersCount > pageSize) {
      setIsShowMoreUsersButton(true)
    } else {
      setIsShowMoreUsersButton(false)
    }
  }, [maxPageCount, totalUsersCount, pageSize])

  useEffect(() => {
    dispatch(getUsers(1, termOfUrl))
  }, [termOfUrl, pathname, dispatch])

  const handleShowMoreUsers = useCallback(() => {
    if (maxPageCount > pageNumber) {
      setPageNumber(++pageNumber)
      dispatch(getUsers(pageNumber, termOfUrl))
    }
    if (maxPageCount === pageNumber) {
      setIsShowMoreUsersButton(false)
    }
  }, [dispatch, maxPageCount, pageNumber, termOfUrl])

  return (
    <main className={s.container}>
      <h1 className={s.visuallyHidden}>Users</h1>
      <Search
        searchUsers={searchUsers}
        totalUsersCount={totalUsersCount}
        termOfUrl={termOfUrl}
        pathname={pathname}
      />

      {totalUsersCount === 0 && !isFetching && (
        <NoElement elements='users' writeSomething={false} />
      )}

      <div className={s.wrapUsers}>
        <div className={s.users}>
          {users.map((u: UserType) => (
            <User
              key={u.id}
              user={{
                id: u.id,
                name: u.name,
                status: u.status,
                followed: u.followed,
                photos: u.photos,
              }}
            />
          ))}
        </div>

        <div
          className={cn(s.buttonLoadMore, {
            [s.hiddenButtonLoadMore]: !isShowMoreUsersButton,
          })}
        >
          <IconButton title='Load more users' onClick={handleShowMoreUsers}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    </main>
  )
}

export default memo(Users)
