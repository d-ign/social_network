import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ProfileWall from './ProfileWall/ProfileWall'
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import { getEditModeProfile } from '../../redux/selectors/profile-selectors'
import { AppStateType } from '../../redux/redux-store'
import {
  getUserProfile,
  getStatus,
  actions,
} from '../../redux/reducers/profile-reducer'

type MapStatePropsType = {
  authorizedUserID: number | null
  isEditModeProfile: boolean
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  setEditModeProfile: (bool: boolean) => void
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
    // рендер при переходе с одной страницы на другую
    if (match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  componentWillUnmount() {
    const { isEditModeProfile, setEditModeProfile } = this.props
    if (isEditModeProfile) {
      setEditModeProfile(false)
    }
  }

  refreshProfile() {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    authorizedUserID: state.auth.userID,
    isEditModeProfile: getEditModeProfile(state),
  }
}

export default compose<React.ComponentType>(
  connect<
    MapStatePropsType,
    MapDispatchPropsType,
    RouteComponentProps<PathParamsType>,
    AppStateType
  >(mapStateToProps, {
    getUserProfile,
    getStatus,
    setEditModeProfile: actions.setEditModeProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
