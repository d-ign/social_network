import { usersAPI } from '../api/api';

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
  users: [],
  friends: [],
  foundUsers: [],

  pageSize: 50,
  totalUsersCount: 0,
  currentPage: 1,

  isFetching: true,
  followingInProgress: [], // button disabled после нажатия
};

const usersReducer = (state = initialState, action) => {
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
        users: [ ...state.users, ...action.users ],
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

const followSuccess = (userID) => ({ type: FOLLOW, userID });
const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID });

const setUsers = (users) => ({ type: SET_USERS, users });
const setFriends = (friends) => ({ type: SET_FRIENDS, friends });
const setFoundUsers = (foundUsers) => ({ type: SET_FOUND_USERS, foundUsers });
const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const clearUsers = () => ({ type: CLEAR_USERS });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID
});

export const getUsers = (page, pageSize, term) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term);
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

export const getFoundUsers = (page, pageSize, term) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term);
  dispatch(clearUsers());
  dispatch(setFoundUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

export const getFriends = (page, pageSize, term, friend = true) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize, term, friend);
  dispatch(setFriends(response.items));
  dispatch(setTotalUsersCount(response.totalCount));

  dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, id));
  const response = await apiMethod(id);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id))
  }
  dispatch(toggleFollowingProgress(false, id));
}

export const follow = (id) => async (dispatch) => {
  followUnfollowFlow(dispatch, id,
    usersAPI.followUser.bind(usersAPI), followSuccess)
}

export const unfollow = (id) => async (dispatch) => {
  followUnfollowFlow(dispatch, id,
    usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
}

export default usersReducer;