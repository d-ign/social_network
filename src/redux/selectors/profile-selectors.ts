import { AppStateType } from "../redux-store";

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}

export const getStatusSelector = (state: AppStateType) => {
  return state.profilePage.status
}

export const getShowSuccessSave = (state: AppStateType) => {
  return state.profilePage.showSuccessSave
}

export const getErrorProfileContacts = (state: AppStateType) => {
  return state.profilePage.errorProfileContacts
}

export const getPosts = (state: AppStateType) => {
  return state.profilePage.posts
}

export const getPostsForDelete = (state: AppStateType) => {
  return state.profilePage.postsForDelete
}

export const getToggleClickDeleteSelectedPosts = (state: AppStateType) => {
  return state.profilePage.isClickDeleteSelectedPosts
}

export const getIsSelectedPost = (state: AppStateType) => {
  return state.profilePage.isSelectedPost
}