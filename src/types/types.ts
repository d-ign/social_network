export type PostType = {
  id: number
  message: string
  likesCount: number
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: СontactsType
  photos: PhotosType
}

export type СontactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}