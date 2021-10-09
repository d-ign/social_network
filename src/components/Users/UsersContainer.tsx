import React from 'react'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { useAppSelector } from '../../hooks/useApp'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import { getIsFetching } from '../../redux/selectors/users-selectors'

const UsersContainer = () => {
  const isFetching = useAppSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader display='default' /> : null}
      <Users />
    </>
  )
}

export default withAuthRedirect(UsersContainer)
