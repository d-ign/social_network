import React, { useCallback, memo, SetStateAction, Dispatch } from 'react'

import { Button } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import { useAppDispatch, useAppSelector } from '../../services/hooks/useApp'

import { getFollowingInProgress } from '../../store/selectors/users-selectors'
import { getAuthorizedUserID } from '../../store/selectors/auth-selectors'
import { follow, unfollow } from '../../store/reducers/users-reducer'
import { getTheme } from '../../store/selectors/app-selectors'

type ButtonFollowPropsType = {
  id: number
  followed: boolean | undefined | unknown
  setIsFollowed?: Dispatch<SetStateAction<boolean>> | null
}

const ButtonFollow: React.FC<ButtonFollowPropsType> = ({
  id,
  followed = undefined,
  setIsFollowed = null,
}) => {
  const stylesWrapButton: React.CSSProperties = {
    textAlign: 'center',
  }

  const stylesButton: React.CSSProperties = {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexBasis: '200px',
  }

  const stylesUnfollowButton = {
    color: 'hsla(0, 0%, 93%, 1)',
    ...stylesButton,
  }

  const followingInProgress = useAppSelector(getFollowingInProgress)
  const authorizedUserID = useAppSelector(getAuthorizedUserID)
  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  const handleFollow = useCallback(() => {
    dispatch(follow(id))
    if (setIsFollowed) setIsFollowed(true)
  }, [dispatch, id, setIsFollowed])

  const handleUnfollow = useCallback(() => {
    dispatch(unfollow(id))
    if (setIsFollowed) setIsFollowed(false)
  }, [dispatch, id, setIsFollowed])

  const isDisabledButton = followingInProgress.some(
    (idUser: number) => idUser === id
  )

  return (
    <>
      {followed ? (
        <div style={stylesWrapButton}>
          <Button
            onClick={handleUnfollow}
            disabled={isDisabledButton}
            style={stylesUnfollowButton}
            startIcon={<RemoveIcon />}
          >
            Unfollow
          </Button>
        </div>
      ) : id === authorizedUserID || followed === undefined ? (
        <></>
      ) : (
        <div style={stylesWrapButton}>
          <Button
            onClick={handleFollow}
            disabled={isDisabledButton}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            style={stylesButton}
            startIcon={<AddIcon />}
          >
            Follow
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(ButtonFollow)
