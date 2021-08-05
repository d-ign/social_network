export type PostType = {
  idPost: string
  author: string | undefined
  message: string
  likesCount: number
  isLikeClick: boolean
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  aboutMe: string
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

export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id: number
  message: string
}
