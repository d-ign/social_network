import { AppStateType } from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
};

export const getAuthorizedUserID = (state: AppStateType) => {
  return state.auth.userID
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}; 

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}; 

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
};