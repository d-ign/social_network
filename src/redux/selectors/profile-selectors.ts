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