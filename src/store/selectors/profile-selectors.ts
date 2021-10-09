import { RootStateType } from '../store'

export const getProfile = (state: RootStateType) =>
  state.profilePage.info.profile

export const getStatus = (state: RootStateType) => state.profilePage.info.status

export const getShowSuccessSave = (state: RootStateType) =>
  state.profilePage.info.showSuccessSave

export const getErrorProfileContacts = (state: RootStateType) =>
  state.profilePage.info.errorProfileContacts

export const getPosts = (state: RootStateType) => state.profilePage.wall.posts

export const getPostsForDelete = (state: RootStateType) =>
  new Set(state.profilePage.wall.postsForDelete)

export const getEditModeProfile = (state: RootStateType) =>
  state.profilePage.info.isEditModeProfile
