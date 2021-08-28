export type PostType = {
  idPost: number
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

export type ChatMessageType = ChatMessageAPIType & { id: string }

export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
}

export type StatusWSType = 'pending' | 'ready' | 'error'

export type ThemeType = 'theme1' | 'theme2'
