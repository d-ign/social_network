import React from 'react'

import Friends from './Friends'
import Preloader from '../../components/Preloader/Preloader'
import withAuthRedirect from '../../services/hoc/withAuthRedirect'
import { useAppSelector } from '../../services/hooks/useApp'

import { getIsFetching } from '../../store/selectors/users-selectors'

const FriendsContainer = () => {
  const isFetching = useAppSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Friends />
    </>
  )
}

export default withAuthRedirect(FriendsContainer)
