import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import chatAPI from '../../services/api/chat-api'

import {
  ChatMessageAPIType,
  ChatMessageType,
  StatusWSType,
} from '../../types/types'

const chatSlice = createSlice({
  name: 'chatPage',

  initialState: {
    messages: [] as ChatMessageType[],
    statusWS: 'pending' as StatusWSType,
  },

  reducers: {
    messagesReceived: (
      state,
      action: PayloadAction<{ messages: ChatMessageAPIType[] }>
    ) => {
      state.messages = [
        ...state.messages,
        ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
      ].filter((_, index, array) => index >= array.length - 100)
      // TODO v1() = impure function call
    },

    messagesCleared: (state) => {
      state.messages = []
    },

    statusChanged: (
      state,
      action: PayloadAction<{ statusWS: StatusWSType }>
    ) => {
      state.statusWS = action.payload.statusWS
    },
  },
})

const { messagesReceived, messagesCleared, statusChanged } = chatSlice.actions

export const startMessagesListening = createAsyncThunk(
  'chatPage/startMessagesListening',
  async (_, { dispatch }) => {
    chatAPI.start()

    chatAPI.subscribe('messages-received', (messages: ChatMessageAPIType[]) =>
      dispatch(messagesReceived({ messages }))
    )

    chatAPI.subscribe('status-changed', (statusWS: StatusWSType) =>
      dispatch(statusChanged({ statusWS }))
    )
  }
)

export const stopMessagesListening = createAsyncThunk(
  'chatPage/stopMessagesListening',
  async (_, { dispatch }) => {
    chatAPI.stop()
    dispatch(messagesCleared())
  }
)

export const sendMessage = createAsyncThunk(
  'chatPage/sendMessage',
  async (message: string) => {
    chatAPI.sendMessage(message)
  }
)

export default chatSlice.reducer
