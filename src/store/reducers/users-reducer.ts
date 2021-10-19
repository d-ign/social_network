import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ResultCodesEnum } from '../../services/api/api'
import usersAPI from '../../services/api/users-api'
import { UserType } from '../../types/types'

const usersSlice = createSlice({
  name: 'users',

  initialState: {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    isFetching: true,
    // disabling the button after pressing
    followingInProgress: [] as number[], // array of users ID
    isFollowed: undefined as boolean | undefined | unknown,
  },

  reducers: {
    setIsFollowed: (state, action: PayloadAction<{ bool: boolean }>) => {
      state.isFollowed = action.payload.bool
    },

    followSuccess: (state, action: PayloadAction<{ userID: number }>) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload.userID) {
          return { ...u, followed: true }
        }
        return u
      })
    },

    unfollowSuccess: (state, action: PayloadAction<{ userID: number }>) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload.userID) {
          return { ...u, followed: false }
        }
        return u
      })
    },

    setUsers: (state, action: PayloadAction<{ users: UserType[] }>) => {
      state.users = [...action.payload.users]
    },

    addUsers: (state, action: PayloadAction<{ users: UserType[] }>) => {
      state.users = [...state.users, ...action.payload.users]
    },

    setTotalUsersCount: (
      state,
      action: PayloadAction<{ totalUsersCount: number }>
    ) => {
      state.totalUsersCount = action.payload.totalUsersCount
    },

    clearUsers: (state) => {
      state.users = []
    },

    toggleIsFetching: (
      state,
      action: PayloadAction<{ isFetching: boolean }>
    ) => {
      state.isFetching = action.payload.isFetching
    },

    toggleFollowingProgress: (
      state,
      action: PayloadAction<{ isFetching: boolean; userID: number }>
    ) => {
      const { userID } = action.payload

      state.followingInProgress = action.payload.isFetching
        ? [...state.followingInProgress, userID]
        : state.followingInProgress.filter((id) => id !== userID)
    },
  },
})

export const {
  setIsFollowed,
  followSuccess,
  unfollowSuccess,
  setUsers,
  addUsers,
  setTotalUsersCount,
  clearUsers,
  toggleIsFetching,
  toggleFollowingProgress,
} = usersSlice.actions

type GetUsersPropsType = {
  page: number
  term: string
  friend?: boolean
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (props: GetUsersPropsType, { dispatch, getState }) => {
    const { page, term, friend } = props
    const {
      users: { pageSize },
    } = getState() as { users: { pageSize: number } }

    dispatch(toggleIsFetching({ isFetching: true }))

    const response = await usersAPI.getUsers(page, pageSize, term, friend)

    // primary download
    if (term.length === 0 && page === 1) {
      dispatch(setUsers({ users: response.items }))
    }
    // get more users
    if (page > 1) {
      dispatch(addUsers({ users: response.items }))
    }
    // primary search
    if (term.length > 0 && page === 1) {
      dispatch(clearUsers())
      dispatch(setUsers({ users: response.items }))
    }

    dispatch(setTotalUsersCount({ totalUsersCount: response.totalCount }))
    dispatch(toggleIsFetching({ isFetching: false }))
  }
)

export const getIsFollowed = createAsyncThunk(
  'users/getIsFollowed',
  async (id: number, { dispatch }) => {
    const response = await usersAPI.isFollowed(id)

    dispatch(setIsFollowed({ bool: response }))
  }
)

export const follow = createAsyncThunk(
  'users/follow',
  async (id: number, { dispatch }) => {
    dispatch(toggleFollowingProgress({ isFetching: true, userID: id }))

    const response = await usersAPI.followUser(id)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(followSuccess({ userID: id }))
      dispatch(setIsFollowed({ bool: true }))
    }

    dispatch(toggleFollowingProgress({ isFetching: false, userID: id }))
  }
)

export const unfollow = createAsyncThunk(
  'users/unfollow',
  async (id: number, { dispatch }) => {
    dispatch(toggleFollowingProgress({ isFetching: true, userID: id }))

    const response = await usersAPI.unfollowUser(id)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(unfollowSuccess({ userID: id }))
      dispatch(setIsFollowed({ bool: false }))
    }

    dispatch(toggleFollowingProgress({ isFetching: false, userID: id }))
  }
)

export default usersSlice.reducer
