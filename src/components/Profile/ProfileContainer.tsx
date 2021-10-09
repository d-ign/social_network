import React from 'react'
import { PayloadActionCreator } from '@reduxjs/toolkit'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ProfileWall from './ProfileWall/ProfileWall'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import { getEditModeProfile } from '../../redux/selectors/profile-selectors'
import { RootStateType } from '../../redux/redux-store'
import {
  getStatus,
  getUserProfile,
  setEditModeProfile,
} from '../../redux/reducers/profile-info-reducer'

type MapStatePropsType = {
  authorizedUserID: number | null
  isEditModeProfile: boolean
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  setEditModeProfile: PayloadActionCreator<{ bool: boolean }>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>

class ProfileContainer extends React.PureComponent<PropsType> {
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    const { match } = this.props
    // render when switching from one page to another
    if (match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { isEditModeProfile, setEditModeProfile } = this.props
    if (isEditModeProfile) {
      setEditModeProfile({ bool: false })
    }
  }

  refreshProfile() {
    // getUserProfile and getStatus are already declared in the upper scope
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { match, authorizedUserID, history, getUserProfile, getStatus } =
      this.props
    let userId: number | null = +match.params.userId

    if (!userId) {
      userId = authorizedUserID
      if (!userId) {
        history.push('/login')
      }
    }

    getUserProfile(userId as number)
    getStatus(userId as number)
  }

  render(): React.ReactElement<PropsType> {
    const { match, authorizedUserID, isEditModeProfile } = this.props
    const isOwner = +match.params.userId === authorizedUserID

    return (
      <main>
        <ProfileInfoContainer isOwner={isOwner} />
        {!isEditModeProfile && isOwner && <ProfileWall />}
      </main>
    )
  }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    authorizedUserID: state.authPage.userID,
    isEditModeProfile: getEditModeProfile(state),
  }
}

export default compose<React.ComponentType>(
  connect<
    MapStatePropsType,
    MapDispatchPropsType,
    RouteComponentProps<PathParamsType>,
    RootStateType
  >(mapStateToProps, {
    getUserProfile,
    getStatus,
    setEditModeProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
