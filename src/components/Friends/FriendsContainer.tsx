import React from 'react'
import { useSelector } from 'react-redux'

import Friends from './Friends'
import Preloader from '../common/Preloader/Preloader'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import { getIsFetching } from '../../redux/selectors/users-selectors'

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
