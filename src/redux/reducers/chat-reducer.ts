import { FormAction } from 'redux-form'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { BaseThunkType, InferActionsTypes } from '../redux-store'
import { chatAPI, ChatMessageAPIType, StatusType } from '../../api/chat-api'

export type ChatMessageType = ChatMessageAPIType & { id: string }

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
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
    case 'STATUS_CHANGED': {
      return {
        ...state,
        status: action.payload.status,
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
  statusChanged: (status: StatusType) =>
    ({
      type: 'STATUS_CHANGED',
      payload: { status },
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  // чтобы два раза не вызывалась одна и та же функция,
  // сначала при подписке, потом при отписке
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  // чтобы два раза не вызывалась одна и та же функция,
  // сначала при подписке, потом при отписке
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()

  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))

  chatAPI.stop()
}

export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chatAPI.sendMessage(message)
  }

export default chatReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
