import { Dispatch } from 'redux';
import { ResultCodesEnum } from '../../api/api';
import { usersAPI } from '../../api/users-api';
import { UserType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from '../redux-store';

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
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
    case 'UNFOLLOW': {
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
    case 'SET_USERS': {
      return {
        ...state,
        users: [...state.users, ...action.users],
        foundUsers: []
      }
    }
    case 'CLEAR_USERS': {
      return {
        ...state,
        users: []
      }
    }
    case 'SET_FRIENDS': {
      return {
        ...state,
        friends: action.friends
      }
    }
    case 'SET_FOUND_USERS': {
      return {
        ...state,
        users: [],
        foundUsers: action.foundUsers
      }
    }
    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.count,
      }
    }
    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
  followSuccess: (userID: number) => ({ type: 'FOLLOW', userID } as const),
  unfollowSuccess: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),

  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setFriends: (friends: Array<UserType>) => ({ type: 'SET_FRIENDS', friends } as const),
  setFoundUsers: (foundUsers: Array<UserType>) => ({ type: 'SET_FOUND_USERS', foundUsers } as const),

  setTotalUsersCount: (totalUsersCount: number) => ({ 
    type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
  clearUsers: () => ({ type: 'CLEAR_USERS' } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userID: number) => ({ 
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const),
}

export const getUsers = (page: number, pageSize: number, term: string):
  ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));

    const response = await usersAPI.getUsers(page, pageSize, term);
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));

    dispatch(actions.toggleIsFetching(false));
  }

export const getFoundUsers = (page: number, pageSize: number, term: string):
  ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));

    const response = await usersAPI.getUsers(page, pageSize, term);
    dispatch(actions.clearUsers());
    dispatch(actions.setFoundUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));

    dispatch(actions.toggleIsFetching(false));
  }

export const getFriends = (page: number, pageSize: number, term: string, friend = true):
  ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));

    const response = await usersAPI.getUsers(page, pageSize, term, friend);
    dispatch(actions.setFriends(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));

    dispatch(actions.toggleIsFetching(false));
  }

type DispatchType = Dispatch<ActionsTypes>;
const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (id: number) => ActionsTypes) => {
    
  dispatch(actions.toggleFollowingProgress(true, id));
  const response = await apiMethod(id);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(id))
  }
  dispatch(actions.toggleFollowingProgress(false, id));
}

export const follow = (id: number): ThunkType => async (dispatch: any) => {
  _followUnfollowFlow(dispatch, id,
    usersAPI.followUser.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (id: number): ThunkType => async (dispatch: any) => {
  _followUnfollowFlow(dispatch, id,
    usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess)
}

export default usersReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;