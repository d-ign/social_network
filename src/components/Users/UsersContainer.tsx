import React from 'react'
import { useSelector } from 'react-redux'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import withAuthRedirect from '../../hoc/withAuthRedirect'

import { getIsFetching } from '../../redux/selectors/users-selectors'

const UsersContainer = () => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader display='default' /> : null}
      <Users />
    </>
  )
}

export default withAuthRedirect(UsersContainer)
