import { profileAPI } from '../api/api';
import { PostType } from '../types/types';
import { ProfileType } from '../types/types';
import { PhotosType } from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER = 'SET-USER';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SHOW_SUCCESS_SAVE = 'SHOW_SUCCESS_SAVE';
const SHOW_ERROR_PROFILE_CONTACTS = 'SHOW_ERROR_PROFILE_CONTACTS';

let initialState = {
  posts: [
    { id: 1, message: 'Стена Привет!', likesCount: 12 },
    { id: 2, message: 'Стена Как дела?', likesCount: 4 },
  ] as Array<PostType>,

  profile: null as ProfileType | null,
  status: '',
  showSuccessSave: '',
  errorProfileContacts: '',
  newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        newPostText: ''
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
        profile: { ...state.profile, photos: action.photos } as ProfileType
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

type AddPostType = { type: typeof ADD_POST, newPostText: string }
export const addPost = (newPostText: string): AddPostType => ({ type: ADD_POST, newPostText });

type DeletePostType = { type: typeof DELETE_POST, postID: number }
export const deletePost = (postID: number): DeletePostType => ({ type: DELETE_POST, postID });

type SetUserProfileType = { type: typeof SET_USER, profile: ProfileType }
const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER, profile });

type SetStatusType = { type: typeof SET_STATUS, status: string | null }
const setStatus = (status: string | null): SetStatusType => ({ type: SET_STATUS, status });

type SavePhotoSuccessType = { type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType }
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type ShowSuccessSaveProfileType = { type: typeof SHOW_SUCCESS_SAVE, message: string}
const showSuccessSaveProfile = (message: string): ShowSuccessSaveProfileType => ({ type: SHOW_SUCCESS_SAVE, message });

type ShowErrorProfileContactsType = { type: typeof SHOW_ERROR_PROFILE_CONTACTS, message: string}
const showErrorProfileContacts = (message: string): ShowErrorProfileContactsType => ({ type: SHOW_ERROR_PROFILE_CONTACTS, message });



export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (id: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(id);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhotoThunk = (photos: PhotosType) => async (dispatch: any) => {
  const response = await profileAPI.savePhotoAPI(photos);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfileThunk = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const response = await profileAPI.saveProfileAPI(profile);
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