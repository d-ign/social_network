import React from 'react'
import { useSelector } from 'react-redux'

import { Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import s from './User.module.scss'

import Avatar from '../Avatar/Avatar'
import Popup from './Popup/Popup'
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

  return (
    <div className={s.user}>
      <div className={s.wrapAvatarNameAndStatus}>
        <div className={s.wrapAvatar}>
          <Avatar photo={photos.large} size='large' id={id} />
        </div>

        <div className={s.nameAndStatus}>
          {name?.length > 19 ? (
            <Popup element={name}>
              <Name id={id} name={name} />
            </Popup>
          ) : (
            <Name id={id} name={name} />
          )}

          {status?.length > 19 ? (
            <Popup element={status}>
              <div className={s.status}>{status}</div>
            </Popup>
          ) : (
            <div className={s.status}>{status}</div>
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
    </div>
  )
}

export default User
