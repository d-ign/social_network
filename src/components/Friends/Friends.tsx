import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import s from './Friends.module.scss'

import User from '../common/User/User'
import Search from '../common/Search/Search'
import Preloader from '../common/Preloader/Preloader'
import NoElement from '../common/NoElement/NoElement'
import useObserver from '../../hooks/useObserver'

import { getTheme } from '../../redux/selectors/app-selectors'
import {
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../redux/selectors/users-selectors'
import {
  actions,
  follow,
  getUsers,
  unfollow,
} from '../../redux/reducers/users-reducer'

import { UserType } from '../../types/types'

type PathParamsType = {
  pathname: string
}

const Friends: React.FC<RouteComponentProps<PathParamsType>> = React.memo(
  ({ location: { pathname } }) => {
    const theme = useSelector(getTheme)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSelector)
    const isFetching = useSelector(getIsFetching)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const dispatch = useDispatch()

    const maxPageCount = Math.ceil(totalUsersCount / pageSize)
    // eslint-disable-next-line prefer-const
    let [pageNumber, setPageNumber] = useState(1)

    const searchUsers = (term: string) => {
      setPageNumber(1)
      dispatch(getUsers(1, term, true))
    }

    useEffect(() => {
      dispatch(actions.clearUsers())
      setPageNumber(1)
      dispatch(getUsers(1, '', true))
      setIsFetchingUsers(true)
    }, [pathname, dispatch])

    // динамическая пагинация
    const lastElement = React.useRef<HTMLDivElement>(null)
    const [isFetchingUsers, setIsFetchingUsers] = useState(false)

    useObserver(lastElement, maxPageCount > pageNumber, isFetching, () => {
      setIsFetchingUsers(true)
      setPageNumber(++pageNumber)
      dispatch(getUsers(pageNumber, '', true))
    })

    useEffect(() => {
      setIsFetchingUsers(false)
    }, [users.length])

    if (isFetching) {
      return <Preloader display='default' />
    }

    return (
      <main className={s.wrapper}>
        <Search
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
                theme={theme}
                follow={(id: number) => dispatch(follow(id))}
                unfollow={(id: number) => dispatch(unfollow(id))}
              />
            ))}
          </div>

          {isFetchingUsers && <Preloader display='block' />}
          {!isFetching && <div ref={lastElement} className={s.lastElement} />}
        </div>
      </main>
    )
  }
)

export default withRouter(Friends)
