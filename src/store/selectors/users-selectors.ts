import { RootStateType } from '../store'

export const getUsersSelector = (state: RootStateType) => state.users.users

export const getPageSize = (state: RootStateType) => state.users.pageSize

export const getTotalUsersCount = (state: RootStateType) =>
  state.users.totalUsersCount

export const getIsFetching = (state: RootStateType) => state.users.isFetching

export const getFollowingInProgress = (state: RootStateType) =>
  state.users.followingInProgress
