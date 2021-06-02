import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objects-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
  users: [],
  pageSize: 50,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true, // Preloader - крутилка во время ожидания ответа от сервера. is - это означает вопрос: получен? Вообще смотреть на последнее слово, оно ообозначает то, что находится в значении
  followingInProgress: [], // disabled button после нажатия
};

// здесь в зависимости от type в action который к нас пришел мы возвращаем новый объект на основе старого state (копируем) и вносит свои изменения (перезаписываем одно из свойств)
const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(
          state.users, action.userID, 'id', { followed: true }),
        // users: state.users.map(u => {
        //   if (u.id === action.userID) {
        //     return { ...u, followed: true }
        //   }
        //   return u
        // })
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(
          state.users, action.userID, 'id', { followed: false }),

        // users: state.users.map(u => {
        //   if (u.id === action.userID) {
        //     return { ...u, followed: false }
        //   }
        //   return u
        // })
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users
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
        // делаем блокировку только одной кнопки подписки пока идёт запрос и возвращается ответ с сервера, а не всех
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id !== action.userID), // filter вернёт новый массив, поэтому копию не нужно делать
      }
    }
    default:
      return state;
  }
};

// это action creators = call backs, которые dispatch-ит connect (сам за кадром) и они возвращают action (объекты), который сам redux берёт и отправляет в соответствующий reducer, и после определяется совпадающий case, делается копия state, они сравниваются и отличия перерисовывается (ререндериваються) - перерисовывается UI
const followSuccess = (userID) => ({ type: FOLLOW, userID });
const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID });

// получить всех пользователей
const setUsers = (users) => ({ type: SET_USERS, users: users });
// установить текущую страницу, на которую кликаем
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage }); // или currentPage просто
// установить общее кол-во пользователей
const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID });




// создатель "санки"
export const getUsersThunk = (page, pageSize) => {
  // возвращаем "санку", замкнув параметр выше
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    usersAPI.getUsers(page, pageSize).then(data => {
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      dispatch(toggleIsFetching(false));
    });
  }
}







const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, id));

  const response = await apiMethod(id);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id))
  }

  dispatch(toggleFollowingProgress(false, id));
}

export const follow = (id) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, id, 
      usersAPI.followUser.bind(usersAPI), followSuccess)
  }
}

export const unfollow = (id) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, id, 
      usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
  }
}



export default usersReducer;