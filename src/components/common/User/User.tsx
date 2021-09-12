import React, { useCallback, useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import s from './User.module.scss'

import useResizeWindow from '../../../hooks/useResizeWindow'

import Avatar from '../Avatar/Avatar'
import Tooltip from './Tooltip/Tooltip'
import Name from '../Name/Name'

import { getFollowingInProgress } from '../../../redux/selectors/users-selectors'
import { getAuthorizedUserID } from '../../../redux/selectors/auth-selectors'
import { follow, unfollow } from '../../../redux/reducers/users-reducer'
import { getTheme } from '../../../redux/selectors/app-selectors'

import { UserType } from '../../../types/types'

const User: React.FC<{ user: UserType }> = (props) => {
  const {
    user: { id, photos, name, status, followed },
  } = props

  const stylesFollowedButton: React.CSSProperties = {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexBasis: '200px',
  }

  const followingInProgress = useSelector(getFollowingInProgress)
  const authorizedUserID = useSelector(getAuthorizedUserID)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [symbolCount, setSymbolCount] = useState(19)
  const widthScreen = useResizeWindow()

  useEffect(() => {
    if (widthScreen <= 735) {
      setSymbolCount(10)
    }
  }, [widthScreen])

  const followHandler = useCallback(() => dispatch(follow(id)), [dispatch, id])

  const unfollowHandler = useCallback(
    () => dispatch(unfollow(id)),
    [dispatch, id]
  )

  return (
    <article className={s.user}>
      <div className={s.wrapAvatarNameAndStatus}>
        <div className={s.wrapAvatar}>
          <Avatar photo={photos.large} size='large' id={id} />
        </div>

        <div className={s.nameAndStatus}>
          {name?.length > symbolCount ? (
            <Tooltip element={name}>
              <div className={s.wrapName}>
                <Name id={id} name={name} size='normal' />
              </div>
            </Tooltip>
          ) : (
            <div className={s.wrapName}>
              <Name id={id} name={name} size='normal' />
            </div>
          )}

          {status?.length > symbolCount ? (
            <Tooltip element={status}>
              <div className={s.status}>
                <i>{status}</i>
              </div>
            </Tooltip>
          ) : (
            <div className={s.status}>
              <i>{status}</i>
            </div>
          )}
        </div>
      </div>

      {followed ? (
        <div className={s.button}>
          <Button
            onClick={unfollowHandler}
            disabled={followingInProgress.some((idUser) => idUser === id)}
            style={stylesFollowedButton}
            startIcon={<RemoveIcon />}
          >
            Unfollow
          </Button>
        </div>
      ) : id === authorizedUserID ? (
        <></>
      ) : (
        <div className={s.button}>
          <Button
            onClick={followHandler}
            disabled={followingInProgress.some((idUser) => idUser === id)}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            style={stylesFollowedButton}
            startIcon={<AddIcon />}
          >
            Follow
          </Button>
        </div>
      )}
    </article>
  )
}

export default memo(User)
