import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import s from './Users.module.scss'

import User from '../common/User/User'
import Search from '../common/Search/Search'
import NoElement from '../common/NoElement/NoElement'

import useQueryUrl from '../../hooks/useQueryUrl'

import { getTheme } from '../../redux/selectors/app-selectors'
import {
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../redux/selectors/users-selectors'
import { follow, getUsers, unfollow } from '../../redux/reducers/users-reducer'

import { UserType } from '../../types/types'

type PathParamsType = {
  pathname: string
}

const Users: React.FC<RouteComponentProps<PathParamsType>> = React.memo(
  ({ location: { pathname } }) => {
    const theme = useSelector(getTheme)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSelector)
    const isFetching = useSelector(getIsFetching)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const dispatch = useDispatch()

    const maxPageCount = Math.ceil(totalUsersCount / pageSize)

    const [isShowMoreUsersButton, setIsShowMoreUsersButton] = useState(true)
    // eslint-disable-next-line prefer-const
    let [pageNumber, setPageNumber] = useState(1)
    const [termOfUrl, setTermOfUrl] = useState('')

    // for Search
    const searchUsers = (term: string) => {
      setPageNumber(1)
      setTermOfUrl(term)
      dispatch(getUsers(1, term))

      if (maxPageCount === pageNumber) {
        setIsShowMoreUsersButton(false)
      }
      if (maxPageCount > pageNumber) {
        setIsShowMoreUsersButton(true)
      }
    }

    useEffect(() => {
      if (totalUsersCount > pageSize) {
        setIsShowMoreUsersButton(true)
      } else {
        setIsShowMoreUsersButton(false)
      }
    }, [maxPageCount, totalUsersCount, pageSize])

    useQueryUrl(termOfUrl, setTermOfUrl, pathname)

    useEffect(() => {
      dispatch(getUsers(1, termOfUrl))
    }, [termOfUrl, pathname, dispatch])

    const handleShowMoreUsers = () => {
      if (maxPageCount > pageNumber) {
        setPageNumber(++pageNumber)
        dispatch(getUsers(pageNumber, termOfUrl))
      }
      if (maxPageCount === pageNumber) {
        setIsShowMoreUsersButton(false)
      }
    }

    return (
      <main className={s.wrapper}>
        <Search
          searchUsers={searchUsers}
          totalUsersCount={totalUsersCount}
          termOfUrl={termOfUrl}
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
)

export default withRouter(Users)
