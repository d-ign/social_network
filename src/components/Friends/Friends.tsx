import React, { useState, useEffect, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import s from './Friends.module.scss'

import User from '../common/User/User'
import Search from '../common/Search/Search'
import Preloader from '../common/Preloader/Preloader'
import NoElement from '../common/NoElement/NoElement'
import useObserver from '../../hooks/useObserver'

import {
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../redux/selectors/users-selectors'
import { actions, getUsers } from '../../redux/reducers/users-reducer'

import { UserType } from '../../types/types'

const Friends: React.FC = () => {
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsersSelector)
  const isFetching = useSelector(getIsFetching)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const maxPageCount = Math.ceil(totalUsersCount / pageSize)
  // eslint-disable-next-line prefer-const
  let [pageNumber, setPageNumber] = useState(1)
  const [termLocal, setTermLocal] = useState('')

  const searchUsers = useCallback(
    (term: string) => {
      setPageNumber(1)
      setTermLocal(term)
      dispatch(getUsers(1, term, true))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(actions.clearUsers())
    setPageNumber(1)
    dispatch(getUsers(1, '', true))
    setIsFetchingUsers(true)
  }, [pathname, dispatch])

  // dynamic pagination
  const lastElement = React.useRef<HTMLDivElement>(null)
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)

  useObserver(lastElement, maxPageCount > pageNumber, isFetching, () => {
    setIsFetchingUsers(true)
    setPageNumber(++pageNumber)
    dispatch(getUsers(pageNumber, termLocal, true))
  })

  useEffect(() => {
    setIsFetchingUsers(false)
  }, [users.length])

  return (
    <main className={s.wrapper}>
      <h1 className={s.visuallyHidden}>Friends</h1>
      <Search
        termOfUrl=''
        searchUsers={searchUsers}
        totalUsersCount={totalUsersCount}
        pathname={pathname}
      />

      {totalUsersCount === 0 && !isFetching && (
        <NoElement elements='users' writeSomething={false} />
      )}

      <div className={s.container}>
        <div className={s.wrapUsers}>
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

        {isFetchingUsers && <Preloader display='block' />}
        {!isFetching && <div ref={lastElement} className={s.lastElement} />}
      </div>
    </main>
  )
}

export default memo(Friends)
