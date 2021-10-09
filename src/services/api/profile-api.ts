import { PhotosType, ProfileType } from '../../types/types'
import { DefaultResponseType, instance } from './api'

type SavePhotoDataType = {
  photos: PhotosType
}

const profileAPI = {
  async getProfile(id: number | null) {
    const response = await instance.get<ProfileType>(`profile/${id}`)
    return response.data
  },

  async getStatus(id: number) {
    const response = await instance.get<string>(`profile/status/${id}`)
    return response.data
  },

  async updateStatus(status: string) {
    const response = await instance.put<DefaultResponseType>('profile/status', {
      status,
    })
    return response.data
  },

  async savePhotoAPI(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    const response = await instance.put<DefaultResponseType<SavePhotoDataType>>(
      'profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  },

  async saveProfileAPI(profile: ProfileType) {
    const response = await instance.put<DefaultResponseType>('profile', profile)
    return response.data
  },
}

export default profileAPI
