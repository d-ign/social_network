import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import unknown from '../../../img/no_photo.svg'
import s from './User.module.scss'

type PropsType = {
  id: number
  photo: string | null
  name: string
  status: string
  followed: boolean
  authorizedUserID: number | null
  followingInProgress: Array<number>
  follow: (id: number) => void
  unfollow: (id: number) => void
}

const User: React.FC<PropsType> = (props) => {
  const {
    id,
    photo,
    name,
    status,
    followed,
    unfollow,
    follow,
    followingInProgress,
    authorizedUserID,
  } = props

  const stylesFollowedButton = {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexBasis: '200px',
  }

  const stylesNavLink = {
    textDecoration: 'none',
    display: 'block',
  }

  return (
    <>
      <NavLink to={`/profile/${id}`} style={stylesNavLink}>
        <div className={s.wrapAvatarNameAndStatus}>
          <div>
            <div className={s.avatar}>
              <img src={photo !== null ? photo : unknown} alt='avatar' />
            </div>
          </div>

          <div className={s.nameAndStatus}>
            {name?.length > 19 ? (
              <div data-tooltip={name}>
                <div className={s.name}>{name}</div>
              </div>
            ) : (
              <div className={s.name}>{name}</div>
            )}
            {status?.length > 19 ? (
              <div data-tooltip={status}>
                <div className={s.status}>{status}</div>
              </div>
            ) : (
              <div className={s.status}>{status}</div>
            )}
          </div>
        </div>
      </NavLink>

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
            color='primary'
            style={stylesFollowedButton}
            startIcon={<AddIcon />}
          >
            Follow
          </Button>
        </div>
      )}
    </>
  )
}

export default User
