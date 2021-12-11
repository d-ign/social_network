import React, { useEffect } from 'react'
import { useParams, Redirect, Switch } from 'react-router-dom'

import ProfileWall from './ProfileWall/ProfileWall'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'
import withAuthRedirect from '../../services/hoc/withAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../services/hooks/useApp'

import { getEditModeProfile } from '../../store/selectors/profile-selectors'
import {
  getStatus,
  getUserProfile,
  setEditModeProfile,
} from '../../store/reducers/profile-info-reducer'
import { getAuthorizedUserID } from '../../store/selectors/auth-selectors'

const ProfileContainer: React.FC = () => {
  const authorizedUserID = useAppSelector(getAuthorizedUserID)
  const isEditModeProfile = useAppSelector(getEditModeProfile)
  const dispatch = useAppDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const match: any = useParams()
  const userIdFromUrl = Number(match.userId)
  const isOwner = userIdFromUrl === authorizedUserID

  useEffect(() => {
    dispatch(getUserProfile(userIdFromUrl))
    dispatch(getStatus(userIdFromUrl))

    return () => {
      if (isEditModeProfile) {
        dispatch(setEditModeProfile({ bool: false }))
      }
    }
  }, [authorizedUserID, dispatch, isEditModeProfile, userIdFromUrl])

  const isProfileWall = !isEditModeProfile && isOwner

  return (
    <main>
      <Switch>
        <Redirect from='/profile/undefined' to='/' />
        <>
          <ProfileInfoContainer isOwner={isOwner} />
          {isProfileWall && <ProfileWall />}
        </>
      </Switch>
    </main>
  )
}

export default withAuthRedirect(ProfileContainer)
