import { FormAction } from 'redux-form'
import { v1 } from 'uuid'
import { BaseThunkType, InferActionsTypes } from '../redux-store'

import chatAPI from '../../api/chat-api'

import {
  ChatMessageAPIType,
  ChatMessageType,
  StatusWSType,
} from '../../types/types'

const initialState = {
  messages: [] as ChatMessageType[],
  statusWS: 'pending' as StatusWSType,
}

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((item, index, array) => index >= array.length - 100),
        // TODO v1() - вызов не чистой функции
      }
    }
    case 'MESSAGES_CLEARED': {
      return {
        ...state,
        messages: [],
      }
    }
    case 'STATUS_CHANGED': {
      return {
        ...state,
        statusWS: action.payload.statusWS,
      }
    }
    default:
      return state
  }
}

const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: 'MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  messagesCleared: () =>
    ({
      type: 'MESSAGES_CLEARED',
    } as const),
  statusChanged: (statusWS: StatusWSType) =>
    ({
      type: 'STATUS_CHANGED',
      payload: { statusWS },
    } as const),
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()

  chatAPI.subscribe('messages-received', (messages: ChatMessageAPIType[]) =>
    dispatch(actions.messagesReceived(messages))
  )
  chatAPI.subscribe('status-changed', (statusWS: StatusWSType) =>
    dispatch(actions.statusChanged(statusWS))
  )
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.stop()
  dispatch(actions.messagesCleared())
}

export const sendMessage = (message: string): ThunkType => {
  return async () => {
    chatAPI.sendMessage(message)
  }
}

export default chatReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
