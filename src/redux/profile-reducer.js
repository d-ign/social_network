import { usersAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER = 'SET-USER';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST;'

// если state не придёт в reducer, то initialState будет этим начальным state (как параметр по умолчанию у функции func(a=initialState, b))
let initialState = {
  posts: [
    { id: '1', message: 'Стена Привет!', likesCount: 12 },
    { id: '2', message: 'Стена Как дела?', likesCount: 4 },
  ],

  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [
          ...state.posts, 
          newPost
        ],
      }
    }

    case SET_USER: {
      return {
        ...state,
        profile: action.profile
      }
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID)
      }
    }

    default:
      return state; 
  }
};


// action creator
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postID) => ({ type: DELETE_POST, postID });

const setUserProfile = (profile) => ({ type: SET_USER, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });




// thunk
export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
      .then(response => {
        dispatch(setUserProfile(response.data));
      });
  }
};

export const getStatus = (id) => { // получить текущий статус
  return (dispatch) => {
    profileAPI.getStatus(id)
      .then(response => {
        dispatch(setStatus(response.data));
      });
  }
};

export const updateStatus = (status) => { // обновить статус на новый
  return (dispatch) => {
    profileAPI.updateStatus(status)
      .then(response => {
        if(response.data.resultCode === 0) {
          dispatch(setStatus(status));
        }
      });
  }
};

export default profileReducer;