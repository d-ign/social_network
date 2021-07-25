import { AppStateType } from "../redux-store";

export const getMessages = (state: AppStateType) => {
  return state.chat.messages
}
export const getChatMembers = (state: AppStateType) => {
  return state.chat.messages.filter((value, index, array) => (
    array.findIndex(item => item.userId === value.userId) === index 
    ? value 
    : null
  ))
}
export const getStatus = (state: AppStateType) => {
  return state.chat.status
}