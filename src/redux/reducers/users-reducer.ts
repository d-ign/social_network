import { Dispatch } from 'redux'
import { DefaultResponseType, ResultCodesEnum } from '../../api/api'
import usersAPI from '../../api/users-api'
import { UserType } from '../../types/types'
import { BaseThunkType, InferActionsTypes } from '../redux-store'

const initialState = {
  users: [] as Array<UserType>,

  pageSize: 10,
  totalUsersCount: 0,

  isFetching: true,
  // disabling the button after pressing
  followingInProgress: [] as Array<number>, // array of users ID
}

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true }
          }
          return u
        }),
      }
    }
    case 'UNFOLLOW': {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false }
          }
          return u
        }),
      }
    }
    case 'SET_USERS': {
      return {
        ...state,
        users: [...action.users],
      }
    }
    case 'ADD_USERS': {
      return {
        ...state,
        users: [...state.users, ...action.users],
      }
    }
    case 'CLEAR_USERS': {
      return {
        ...state,
        users: [],
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
          : state.followingInProgress.filter((id) => id !== action.userID),
      }
    }
    default:
      return state
  }
}

export const actions = {
  followSuccess: (userID: number) => ({ type: 'FOLLOW', userID } as const),
  unfollowSuccess: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),

  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  addUsers: (users: Array<UserType>) => ({ type: 'ADD_USERS', users } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),
  clearUsers: () => ({ type: 'CLEAR_USERS' } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userID: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userID,
    } as const),
}

export const getUsers =
  (page: number, term: string, friend?: boolean): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))

    const response = await usersAPI.getUsers(
      page,
      getState().usersPage.pageSize,
      term,
      friend
    )

    // первичная загрузка
    if (term.length === 0 && page === 1) {
      dispatch(actions.setUsers(response.items))
    }
    // получение больше пользователей
    if (page > 1) {
      dispatch(actions.addUsers(response.items))
    }
    // первичный поиск
    if (term.length > 0 && page === 1) {
      dispatch(actions.clearUsers())
      dispatch(actions.setUsers(response.items))
    }

    dispatch(actions.setTotalUsersCount(response.totalCount))
    dispatch(actions.toggleIsFetching(false))
  }

type DispatchType = Dispatch<ActionsTypes>
const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: (id: number) => Promise<DefaultResponseType>,
  actionCreator: (id: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, id))
  const response = await apiMethod(id)

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(id))
  }
  dispatch(actions.toggleFollowingProgress(false, id))
}

export const follow =
  (id: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.followUser.bind(usersAPI),
      actions.followSuccess
    )
  }

export const unfollow =
  (id: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.unfollowUser.bind(usersAPI),
      actions.unfollowSuccess
    )
  }

export default usersReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
