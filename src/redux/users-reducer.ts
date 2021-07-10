import { usersAPI } from '../api/api';
import { UserType } from '../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

const SET_USERS = 'SET-USERS';
const CLEAR_USERS = 'CLEAR_USERS';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_FOUND_USERS = 'SET_FOUND_USERS';

const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';

const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  friends: [] as Array<UserType>,
  foundUsers: [] as Array<UserType>,

  pageSize: 50,
  totalUsersCount: 0,
  currentPage: 1,

  isFetching: true,
  // disabling the button after pressing
  followingInProgress: [] as Array<number>, // array of users ID
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return { ...u, followed: true }
          }
          return u
        })
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return { ...u, followed: false }
          }
          return u
        })
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users],
        foundUsers: []
      }
    }
    case CLEAR_USERS: {
      return {
        ...state,
        users: []
      }
    }
    case SET_FRIENDS: {
      return {
        ...state,
        friends: action.friends
      }
    }
    case SET_FOUND_USERS: {
      return {
        ...state,
        users: [],
        foundUsers: action.foundUsers
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id !== action.userID),
      }
    }
    default:
      return state;
  }
};

type FollowSuccessType = { type: typeof FOLLOW, userID: number }
const followSuccess = (userID: number): FollowSuccessType => ({ type: FOLLOW, userID });

type UnfollowSuccessType = { type: typeof UNFOLLOW, userID: number }
const unfollowSuccess = (userID: number): UnfollowSuccessType => ({ type: UNFOLLOW, userID });

type SetUsersType = { type: typeof SET_USERS, users: Array<UserType> }
const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users });

type SetFriendsType = { type: typeof SET_FRIENDS, friends: Array<UserType>}
const setFriends = (friends: Array<UserType>): SetFriendsType => ({ type: SET_FRIENDS, friends });

type SetFoundUsersType = { type: typeof SET_FOUND_USERS, foundUsers: Array<UserType>}
const setFoundUsers = (foundUsers: Array<UserType>): SetFoundUsersType => ({ type: SET_FOUND_USERS, foundUsers });

type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, count: number}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

type ClearUsersType = { type: typeof CLEAR_USERS}
export const clearUsers = (): ClearUsersType => ({ type: CLEAR_USERS });

type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });

type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userID: number}
export const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID
});



export const getUsers = (page: number, pageSize: number, term: string) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term);
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

export const getFoundUsers = (page: number, pageSize: number, term: string) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term);
  dispatch(clearUsers());
  dispatch(setFoundUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

export const getFriends = (page: number, pageSize: number, term: string, friend = true) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term, friend);
  dispatch(setFriends(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingProgress(true, id));
  const response = await apiMethod(id);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id))
  }
  dispatch(toggleFollowingProgress(false, id));
}

export const follow = (id: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, id,
    usersAPI.followUser.bind(usersAPI), followSuccess)
}

export const unfollow = (id: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, id,
    usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
}

export default usersReducer;