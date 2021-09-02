import React from 'react'
import { useSelector } from 'react-redux'
import { getIsFetching } from '../../redux/selectors/users-selectors'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import Preloader from '../common/Preloader/Preloader'
import Friends from './Friends'

const FriendsContainer = () => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader display='default' /> : null}
      <Friends />
    </>
  )
}

export default withAuthRedirect(FriendsContainer)
