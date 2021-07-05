import { usersAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER = 'SET-USER';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SHOW_SUCCESS_SAVE = 'SHOW_SUCCESS_SAVE';
const SHOW_ERROR_PROFILE_CONTACTS = 'SHOW_ERROR_PROFILE_CONTACTS';

let initialState = {
  posts: [
    { id: '1', message: 'Стена Привет!', likesCount: 12 },
    { id: '2', message: 'Стена Как дела?', likesCount: 4 },
  ],

  profile: null,
  status: '',
  showSuccessSave: '',
  errorProfileContacts: '',
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
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photo: action.photo }
      }
    }
    case SHOW_SUCCESS_SAVE: {
      return {
        ...state,
        showSuccessSave: action.message,
      }
    }
    case SHOW_ERROR_PROFILE_CONTACTS: {
      return {
        ...state,
        errorProfileContacts: action.message,
      }
    }
    default:
      return state;
  }
};


export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postID) => ({ type: DELETE_POST, postID });

const setUserProfile = (profile) => ({ type: SET_USER, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });

const savePhotoSuccessAC = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });
const showSuccessSaveProfile = (message) => ({ type: SHOW_SUCCESS_SAVE, message });
const showErrorProfileContacts = (message) => ({ type: SHOW_ERROR_PROFILE_CONTACTS, message });

export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
      .then(response => {
        dispatch(setUserProfile(response.data));
      });
  }
};

export const getStatus = (id) => {
  return (dispatch) => {
    profileAPI.getStatus(id)
      .then(response => {
        dispatch(setStatus(response.data));
      });
  }
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhotoThunk = (photos) => async (dispatch) => {
  const response = await profileAPI.savePhotoAPI(photos);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccessAC(response.data.data.photos));
  }
};

export const saveProfileThunk = (formData) => async (dispatch, getState) => {
  let response = await profileAPI.saveProfileAPI(formData);
  const userID = getState().auth.userID;

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userID));
    dispatch(showSuccessSaveProfile('Data saved successfully!'));
    setTimeout(dispatch, 4000, showSuccessSaveProfile(''));
    dispatch(showErrorProfileContacts(''));
  }
  
  if (response.data.resultCode === 1) {
    // заготовка для показа ошибки конкретного поля
    // let key = response.data.messages[0].match(/Contacts->(\w+)/)[1].toLowerCase();
    // dispatch(stopSubmit('editProfile', {
    //   contacts: { [key]: response.data.messages[0] },
    // }));
    dispatch(showErrorProfileContacts(response.data.messages[0]))
  }
};

export default profileReducer;