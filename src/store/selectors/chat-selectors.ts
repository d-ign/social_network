import { RootStateType } from '../store'

export const getMessages = (state: RootStateType) => state.chatPage.messages

export const getChatMembers = (state: RootStateType) =>
  state.chatPage.messages.filter((value, index, array) =>
    array.findIndex((item) => item.userId === value.userId) === index
      ? value
      : null
  )

export const getStatusWS = (state: RootStateType) => state.chatPage.statusWS
