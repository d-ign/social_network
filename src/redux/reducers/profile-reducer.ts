import { AppStateType, BaseThunkType, InferActionsTypes } from '../redux-store';

import { PostType } from '../../types/types';
import { ProfileType } from '../../types/types';
import { PhotosType } from '../../types/types';

import { ResultCodesEnum } from '../../api/api';
import { profileAPI } from '../../api/profile-api';

let initialState = {
  posts: [
    { id: 1, message: 'Стена Привет!', likesCount: 12 },
    { id: 2, message: 'Стена Как дела?', likesCount: 4 },
  ] as Array<PostType>,

  profile: null as ProfileType | null,
  status: '',
  showSuccessSave: '',
  errorProfileContacts: '',
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
      }
    }
    case 'SET_USER': {
      return {
        ...state,
        profile: action.profile
      }
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status
      }
    }
    // case 'DELETE_POST': {
    //   return {
    //     ...state,
    //     posts: state.posts.filter(p => p.id !== action.postID)
    //   }
    // }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }
    }
    case 'SHOW_SUCCESS_SAVE': {
      return {
        ...state,
        showSuccessSave: action.message,
      }
    }
    case 'SHOW_ERROR_PROFILE_CONTACTS': {
      return {
        ...state,
        errorProfileContacts: action.message,
      }
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  // deletePost: (postID: number) => ({ type: 'DELETE_POST', postID } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
  showSuccessSaveProfile: (message: string) => ({ type: 'SHOW_SUCCESS_SAVE', message } as const),
  showErrorProfileContacts: (message: string) => ({ type: 'SHOW_ERROR_PROFILE_CONTACTS', message } as const),
}

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(response));
};

export const getStatus = (id: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(id);
  dispatch(actions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setStatus(status));
  }
};

export const savePhotoThunk = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhotoAPI(file);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.savePhotoSuccess(response.data.photos));
  }
};

export const saveProfileThunk = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const response = await profileAPI.saveProfileAPI(profile);
  const userID = getState().auth.userID;

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(getUserProfile(userID));
    dispatch(actions.showSuccessSaveProfile('Data saved successfully!'));
    setTimeout(dispatch, 4000, actions.showSuccessSaveProfile(''));
    dispatch(actions.showErrorProfileContacts(''));
  }

  if (response.resultCode === ResultCodesEnum.Error) {
    // заготовка для показа ошибки конкретного поля
    // let key = response.data.messages[0].match(/Contacts->(\w+)/)[1].toLowerCase();
    // dispatch(stopSubmit('editProfile', {
    //   contacts: { [key]: response.data.messages[0] },
    // }));
    dispatch(actions.showErrorProfileContacts(response.messages[0]))
  }
};

export default profileReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;