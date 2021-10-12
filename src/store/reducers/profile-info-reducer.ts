import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ResultCodesEnum } from '../../services/api/api'
import profileAPI from '../../services/api/profile-api'

import { ProfileType, PhotosType } from '../../types/types'

const profileInfoSlice = createSlice({
  name: 'info',
  initialState: {
    profile: null as ProfileType | null,
    status: '',
    showSuccessSave: '',
    errorProfileContacts: '',
    isEditModeProfile: false,
  },
  reducers: {
    setUserProfile: (
      state,
      action: PayloadAction<{ profile: ProfileType }>
    ) => {
      state.profile = action.payload.profile
    },

    setStatus: (state, action: PayloadAction<{ message: string }>) => {
      state.status = action.payload.message
    },

    savePhotoSuccess: (
      state,
      action: PayloadAction<{ photos: PhotosType }>
    ) => {
      if (state.profile) {
        state.profile.photos = action.payload.photos
      }
    },

    showSuccessSaveProfile: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.showSuccessSave = action.payload.message
    },

    showErrorProfileContacts: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.errorProfileContacts = action.payload.message
    },

    setEditModeProfile: (state, action: PayloadAction<{ bool: boolean }>) => {
      state.isEditModeProfile = action.payload.bool
    },
  },
})

export const {
  setUserProfile,
  setStatus,
  savePhotoSuccess,
  showSuccessSaveProfile,
  showErrorProfileContacts,
  setEditModeProfile,
} = profileInfoSlice.actions

export const getUserProfile = createAsyncThunk(
  'info/getUserProfile',
  async (userId: number | null, { dispatch }) => {
    const response = await profileAPI.getProfile(userId)

    dispatch(setUserProfile({ profile: response }))
  }
)

export const getStatus = createAsyncThunk(
  'info/getStatus',
  async (id: number, { dispatch }) => {
    const response = await profileAPI.getStatus(id)

    dispatch(setStatus({ message: response }))
  }
)

export const updateStatus = createAsyncThunk(
  'info/updateStatus',
  async (status: string, { dispatch }) => {
    const response = await profileAPI.updateStatus(status)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(setStatus({ message: status }))
    }
  }
)

export const savePhotoThunk = createAsyncThunk(
  'info/savePhotoThunk',
  async (file: File, { dispatch }) => {
    const response = await profileAPI.savePhotoAPI(file)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(savePhotoSuccess({ photos: response.data.photos }))
    }
  }
)

export const saveProfileThunk = createAsyncThunk(
  'info/saveProfileThunk',
  async (profile: ProfileType, { dispatch, getState }) => {
    const response = await profileAPI.saveProfileAPI(profile)

    const {
      authPage: { userID },
    } = getState() as { authPage: { userID: number } }

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getUserProfile(userID))
      dispatch(showSuccessSaveProfile({ message: 'Data saved successfully!' }))
      setTimeout(dispatch, 4000, showSuccessSaveProfile({ message: '' }))
      dispatch(showErrorProfileContacts({ message: '' }))
    }

    if (response.resultCode === ResultCodesEnum.Error) {
      dispatch(showErrorProfileContacts({ message: response.messages[0] }))
    }
  }
)

export const profileInfoReducer = profileInfoSlice.reducer
