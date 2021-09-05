import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

import { UserType } from '../../../types/types'

type PropsType = {
  theme: string
  follow: (id: number) => void
  unfollow: (id: number) => void
}

const User: React.FC<{ user: UserType } & PropsType> = (props) => {
  const {
    user: { id, photos, name, status, followed },
    theme,
    unfollow,
    follow,
  } = props

  const stylesFollowedButton: React.CSSProperties = {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexBasis: '200px',
  }

  const followingInProgress = useSelector(getFollowingInProgress)
  const authorizedUserID = useSelector(getAuthorizedUserID)

  const [widthScreen, setWidthScreen] = useState(window.innerWidth)
  const [symbolCount, setSymbolCount] = useState(19)

  useResizeWindow(widthScreen, setWidthScreen)

  useEffect(() => {
    if (widthScreen <= 735) {
      setSymbolCount(10)
    }
  }, [widthScreen])

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
            onClick={() => unfollow(id)}
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
            onClick={() => follow(id)}
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

export default User
