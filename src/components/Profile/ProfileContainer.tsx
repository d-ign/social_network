import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import { getUserProfile, getStatus } from '../../redux/reducers/profile-reducer'

import withAuthRedirect from '../common/hoc/withAuthRedirect'
import Wall from './Wall/Wall'
import InfoContainer from './Info/InfoContainer'
import { getEditModeProfile } from '../../redux/selectors/profile-selectors'

type MapStatePropsType = {
  authorizedUserID: number | null
  isEditModeProfile: boolean
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
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

  render() {
    const { match, authorizedUserID, isEditModeProfile } = this.props
    return (
      <>
        <InfoContainer isOwner={+match.params.userId === authorizedUserID} />
        {!isEditModeProfile && <Wall />}
      </>
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
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
