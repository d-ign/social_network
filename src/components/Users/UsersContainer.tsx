import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../redux/selectors/users-selectors';
import withAuthRedirect from '../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

const UsersContainer = () => {
  const isFetching = useSelector(getIsFetching)
  
    return <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
}

export default withAuthRedirect(UsersContainer)