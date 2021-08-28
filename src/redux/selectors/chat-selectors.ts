import { AppStateType } from '../redux-store'

export const getMessages = (state: AppStateType) => state.chat.messages

export const getChatMembers = (state: AppStateType) =>
  state.chat.messages.filter((value, index, array) =>
    array.findIndex((item) => item.userId === value.userId) === index
      ? value
      : null
  )

export const getStatusWS = (state: AppStateType) => state.chat.statusWS
