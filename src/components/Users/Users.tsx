import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import * as queryString from 'querystring'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import s from './Users.module.scss'

import User from './User/User'
import Search from './Search/Search'

import { getTheme } from '../../redux/selectors/app-selectors'
import {
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../redux/selectors/users-selectors'
import { getAuthorizedUserID } from '../../redux/selectors/auth-selectors'
import {
  actions,
  follow,
  getUsers,
  unfollow,
} from '../../redux/reducers/users-reducer'

type PathParamsType = {
  pathname: string
}

const Users: React.FC<RouteComponentProps<PathParamsType>> = React.memo(
  ({ location: { pathname } }) => {
    // for User
    const followingInProgress = useSelector(getFollowingInProgress)
    const authorizedUserID = useSelector(getAuthorizedUserID)

    const theme = useSelector(getTheme)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSelector)
    const isFetching = useSelector(getIsFetching)
    const totalUsersCount = useSelector(getTotalUsersCount)

    const history = useHistory()
    const dispatch = useDispatch()

    const maxPageCount = Math.ceil(totalUsersCount / pageSize)

    const [isShowMoreUsersButton, setIsShowMoreUsersButton] = useState(true)
    // eslint-disable-next-line prefer-const
    let [pageNumber, setPageNumber] = useState(1)
    const [termOfUrl, setTermOfUrl] = useState('')

    // for Search
    const searchUsers = (term: string) => {
      setPageNumber(1)

      if (pathname === '/friends') {
        dispatch(getUsers(1, term, true))
      }
      if (pathname === '/users') {
        setTermOfUrl(term)
        dispatch(getUsers(1, term))
      }

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

    // если есть, достаём из URL term
    useEffect(() => {
      const parsed = queryString.parse(history.location.search.substr(1)) as {
        term: string
      } // substr(1) = удаление ? в начале
      if (parsed.term && pathname === '/users') setTermOfUrl(parsed.term)
    }, [history.location.search, pathname])

    // пуш введённого из поиска в URL
    useEffect(() => {
      if (pathname === '/users') {
        history.replace({
          pathname: '/users',
          search: termOfUrl ? `?term=${termOfUrl}` : '',
        })
      }
    }, [termOfUrl, history, pathname])

    // отрисовка friends + обнуление
    useEffect(() => {
      dispatch(actions.clearUsers())
      setIsShowMoreUsersButton(true)
      setPageNumber(1)

      if (pathname === '/friends') {
        dispatch(getUsers(1, '', true))
        setTermOfUrl('')
      }
    }, [pathname, dispatch])

    // отрисовка users + зависимость от search
    useEffect(() => {
      if (pathname === '/users') {
        dispatch(getUsers(1, termOfUrl))
      }
    }, [termOfUrl, pathname, dispatch])

    const handleShowMoreUsers = () => {
      if (maxPageCount > pageNumber) {
        setPageNumber(++pageNumber)

        if (pathname === '/friends') {
          dispatch(getUsers(pageNumber, termOfUrl, true))
        }
        if (pathname === '/users') {
          dispatch(getUsers(pageNumber, termOfUrl))
        }
      }
      if (maxPageCount === pageNumber) {
        setIsShowMoreUsersButton(false)
      }
    }

    return (
      <div className={s.wrapper}>
        {pathname === '/friends' && (
          <Search
            searchUsers={searchUsers}
            totalUsersCount={totalUsersCount}
            pathname={pathname}
          />
        )}

        {pathname === '/users' && (
          <Search
            searchUsers={searchUsers}
            totalUsersCount={totalUsersCount}
            termOfUrl={termOfUrl}
            pathname={pathname}
          />
        )}

        {totalUsersCount === 0 && !isFetching && (
          <div className={s.noFound}>Nothing found</div>
        )}

        <div className={s.container}>
          <div className={s.wrapUsers}>
            {users.map((u) => (
              <div key={u.id} className={s.user}>
                <User
                  id={u.id}
                  photo={u.photos.small}
                  name={u.name}
                  status={u.status}
                  theme={theme}
                  followed={u.followed}
                  unfollow={(id: number) => dispatch(unfollow(id))}
                  follow={(id: number) => dispatch(follow(id))}
                  followingInProgress={followingInProgress}
                  authorizedUserID={authorizedUserID}
                />
              </div>
            ))}
          </div>

          <div
            className={cn(s.buttonLoadMore, {
              [s.hiddenButtonLoadMore]: !isShowMoreUsersButton,
            })}
          >
            <IconButton
              aria-label='load more users'
              onClick={handleShowMoreUsers}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
)

export default withRouter(Users)
