import React from 'react'

import Friends from './Friends'
import Preloader from '../common/Preloader/Preloader'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { useAppSelector } from '../../hooks/useApp'

import { getIsFetching } from '../../redux/selectors/users-selectors'

const FriendsContainer = () => {
  const isFetching = useAppSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader display='default' /> : null}
      <Friends />
    </>
  )
}

export default withAuthRedirect(FriendsContainer)
