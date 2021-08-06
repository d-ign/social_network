import { v1 } from 'uuid'
import { BaseThunkType, InferActionsTypes } from '../redux-store'

import { PostType, ProfileType, PhotosType } from '../../types/types'

import { ResultCodesEnum } from '../../api/api'
import profileAPI from '../../api/profile-api'

const initialState = {
  posts: [
    {
      author: 'Denis Ignatov',
      idPost: '1',
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis ut quo maiores neque laboriosam. Ratione adipisci
        reiciendis autem placeat alias necessitatibus pariatur saepe
        ipsum, temporibus animi, facilis minus doloribus ducimus.`,
      likesCount: 0,
      isLikeClick: false,
    },
    {
      author: 'Denis Ignatov',
      idPost: '2',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      likesCount: 0,
      isLikeClick: false,
    },
    {
      author: 'Denis Ignatov',
      idPost: '3',
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis ut quo maiores neque laboriosam. Ratione adipisci
        reiciendis autem placeat alias necessitatibus...`,
      likesCount: 0,
      isLikeClick: false,
    },
  ] as Array<PostType>,
  postsForDelete: [] as Array<string>,
  isSelectedPost: false,
  isClickDeleteSelectedPosts: false, // для анимации поста при удалении

  profile: null as ProfileType | null,
  status: '',
  showSuccessSave: '',
  errorProfileContacts: '',
}

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      }
    }
    case 'INITIALIZE_POSTS': {
      return {
        ...state,
        posts: action.posts,
      }
    }
    case 'ADD_POST': {
      const newPost = {
        author: state.profile?.fullName,
        idPost: v1(),
        message: action.newPostText,
        likesCount: 0,
        isLikeClick: false,
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
      }
    }
    case 'IS_SELECTED_POST': {
      return {
        ...state,
        isSelectedPost: action.bool,
      }
    }
    case 'SET_POST_FOR_DELETE': {
      return {
        ...state,
        postsForDelete: [...state.postsForDelete, action.idPost],
      }
    }
    case 'DELETE_POST_FOR_DELETE': {
      return {
        ...state,
        postsForDelete: [
          ...state.postsForDelete.filter((id) => id !== action.idPost),
        ],
      }
    }
    case 'CLEAR_POSTS_FOR_DELETE': {
      return {
        ...state,
        postsForDelete: [],
      }
    }
    case 'TOGGLE_CLICK_DELETE_SELECTED_POST': {
      return {
        ...state,
        isClickDeleteSelectedPosts: action.bool,
      }
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((p) => p.idPost !== action.idPost),
      }
    }
    case 'SET_LIKE_ON_POST': {
      return {
        ...state,
        posts: [
          ...state.posts.map((p) => {
            if (p.idPost === action.idPost) {
              return {
                ...p,
                likesCount: ++p.likesCount,
                isLikeClick: true,
              }
            }
            return p
          }),
        ],
      }
    }
    case 'DELETE_LIKE_ON_POST': {
      return {
        ...state,
        posts: [
          ...state.posts.map((p) => {
            if (p.idPost === action.idPost) {
              return {
                ...p,
                likesCount: --p.likesCount,
                isLikeClick: false,
              }
            }
            return p
          }),
        ],
      }
    }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
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
      return state
  }
}

export const actions = {
  initializePosts: (posts: Array<PostType>) =>
    ({ type: 'INITIALIZE_POSTS', posts } as const),
  addPost: (newPostText: string) =>
    ({ type: 'ADD_POST', newPostText } as const),
  deletePost: (idPost: string) => ({ type: 'DELETE_POST', idPost } as const),
  // лайки-лайки-лайки
  setLikeOnPost: (idPost: string) =>
    ({ type: 'SET_LIKE_ON_POST', idPost } as const),
  deletetLikeOnPost: (idPost: string) =>
    ({ type: 'DELETE_LIKE_ON_POST', idPost } as const),
  // удаление нескольких постов
  setPostForDeleting: (idPost: string) =>
    ({ type: 'SET_POST_FOR_DELETE', idPost } as const),
  deletePostForDeleting: (idPost: string) =>
    ({ type: 'DELETE_POST_FOR_DELETE', idPost } as const),
  clearPostsForDelete: () => ({ type: 'CLEAR_POSTS_FOR_DELETE' } as const),
  // для убирания иконок-крестиков у всех постов при выборе нескольких постов
  toggleIsSelectedPost: (bool: boolean) =>
    ({ type: 'IS_SELECTED_POST', bool } as const),
  // для анимации удаления постов
  toggleIsClickDeleteSelectedPosts: (bool: boolean) =>
    ({ type: 'TOGGLE_CLICK_DELETE_SELECTED_POST', bool } as const),

  setUserProfile: (profile: ProfileType) =>
    ({ type: 'SET_USER', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
  showSuccessSaveProfile: (message: string) =>
    ({ type: 'SHOW_SUCCESS_SAVE', message } as const),
  showErrorProfileContacts: (message: string) =>
    ({ type: 'SHOW_ERROR_PROFILE_CONTACTS', message } as const),
}

export const getUserProfile =
  (userId: number | null): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))
  }

export const getStatus =
  (id: number): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(id)
    dispatch(actions.setStatus(response))
  }

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status))
    }
  }

export const savePhotoThunk =
  (file: File): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.savePhotoAPI(file)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(response.data.photos))
    }
  }

export const saveProfileThunk =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const response = await profileAPI.saveProfileAPI(profile)
    const { userID } = getState().auth

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getUserProfile(userID))
      dispatch(actions.showSuccessSaveProfile('Data saved successfully!'))
      setTimeout(dispatch, 4000, actions.showSuccessSaveProfile(''))
      dispatch(actions.showErrorProfileContacts(''))
    }

    if (response.resultCode === ResultCodesEnum.Error) {
      // заготовка для показа ошибки конкретного поля
      // const key = response.data.messages[0]
      // .match(/Contacts->(\w+)/)[1].toLowerCase()
      // dispatch(stopSubmit('editProfile', {
      //   contacts: { [key]: response.data.messages[0] },
      // }));
      dispatch(actions.showErrorProfileContacts(response.messages[0]))
    }
  }

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
