import React, { useState, useEffect, memo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import s from './Friends.module.scss'

import User from '../../components/User/User'
import Search from '../../components/Search/Search'
import Prompt from '../../components/Prompt/Prompt'
import Preloader from '../../components/Preloader/Preloader'
import NoElement from '../../components/NoElement/NoElement'
import useObserver from '../../services/hooks/useObserver'
import { useAppDispatch, useAppSelector } from '../../services/hooks/useApp'

import {
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../store/selectors/users-selectors'
import { clearUsers, getUsers } from '../../store/reducers/users-reducer'

import { UserType } from '../../types/types'

const Friends: React.FC = () => {
  const pageSize = useAppSelector(getPageSize)
  const users = useAppSelector(getUsersSelector)
  const isFetching = useAppSelector(getIsFetching)
  const totalUsersCount = useAppSelector(getTotalUsersCount)

  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  // eslint-disable-next-line prefer-const
  let [pageNumber, setPageNumber] = useState(1)
  const [termLocal, setTermLocal] = useState('')
  const [isShowPrompt, setIsShowPrompt] = useState(true)

  const maxPageCount = Math.ceil(totalUsersCount / pageSize)

  const searchUsers = useCallback(
    (term: string) => {
      setPageNumber(1)
      setTermLocal(term)
      dispatch(getUsers({ page: 1, term, friend: true }))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(clearUsers())
    setPageNumber(1)
    dispatch(getUsers({ page: 1, term: '', friend: true }))
    setIsFetchingUsers(true)
  }, [pathname, dispatch])

  // dynamic pagination
  const lastElement = React.useRef<HTMLDivElement>(null)
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)

  useObserver({
    elementTrigger: lastElement,
    isCanLoad: maxPageCount > pageNumber,
    isFetching,
    callback: () => {
      setIsShowPrompt(false)
      setIsFetchingUsers(true)
      setPageNumber(++pageNumber)
      dispatch(getUsers({ page: pageNumber, term: termLocal, friend: true }))
    },
  })

  useEffect(() => {
    setIsFetchingUsers(false)
  }, [users.length])

  return (
    <main className={s.container}>
      <h1 className={s.visuallyHidden}>Friends</h1>
      {isShowPrompt && !isFetching && maxPageCount > 1 && (
        <Prompt.PaginationUsers pathname={pathname} />
      )}

      <Search
        termOfUrl=''
        pathname={pathname}
        isFetching={isFetching}
        searchUsers={searchUsers}
        totalUsersCount={totalUsersCount}
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

        {isFetchingUsers && <Preloader display='block' />}
        {!isFetching && <div ref={lastElement} className={s.lastElement} />}
      </div>
    </main>
  )
}

export default memo(Friends)
