import React from 'react'

import Users from './Users'
import Preloader from '../../components/Preloader/Preloader'
import { useAppSelector } from '../../services/hooks/useApp'
import withAuthRedirect from '../../services/hoc/withAuthRedirect'

import { getIsFetching } from '../../store/selectors/users-selectors'

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
