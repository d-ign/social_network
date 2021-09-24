import React, { useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

import { getFollowingInProgress } from '../../../../redux/selectors/users-selectors'
import { getAuthorizedUserID } from '../../../../redux/selectors/auth-selectors'
import { follow, unfollow } from '../../../../redux/reducers/users-reducer'
import { getTheme } from '../../../../redux/selectors/app-selectors'

type ButtonFollowPropsType = {
  followed: boolean
  id: number
}

const ButtonFollow: React.FC<ButtonFollowPropsType> = ({ id, followed }) => {
  const stylesWrapButton: React.CSSProperties = {
    textAlign: 'center',
  }

  const stylesButton: React.CSSProperties = {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexBasis: '200px',
  }

  const followingInProgress = useSelector(getFollowingInProgress)
  const authorizedUserID = useSelector(getAuthorizedUserID)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const followHandler = useCallback(() => dispatch(follow(id)), [dispatch, id])

  const unfollowHandler = useCallback(
    () => dispatch(unfollow(id)),
    [dispatch, id]
  )

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
      ) : id === authorizedUserID ? (
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
