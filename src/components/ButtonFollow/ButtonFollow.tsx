import React, { useCallback, memo, SetStateAction, Dispatch } from 'react'

import { Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

import { useAppDispatch, useAppSelector } from '../../services/hooks/useApp'

import { getFollowingInProgress } from '../../store/selectors/users-selectors'
import { getAuthorizedUserID } from '../../store/selectors/auth-selectors'
import { follow, unfollow } from '../../store/reducers/users-reducer'
import { getTheme } from '../../store/selectors/app-selectors'

type ButtonFollowPropsType = {
  followed: boolean | undefined | unknown
  id: number
  setIsFollowed: Dispatch<SetStateAction<boolean>> | null
}

const ButtonFollow: React.FC<ButtonFollowPropsType> = ({
  id,
  followed,
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

  const followingInProgress = useAppSelector(getFollowingInProgress)
  const authorizedUserID = useAppSelector(getAuthorizedUserID)
  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  const followHandler = useCallback(() => {
    dispatch(follow(id))
    if (setIsFollowed) setIsFollowed(true)
  }, [dispatch, id, setIsFollowed])

  const unfollowHandler = useCallback(() => {
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
            onClick={unfollowHandler}
            disabled={isDisabledButton}
            style={stylesButton}
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
            onClick={followHandler}
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