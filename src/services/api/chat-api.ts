import { ChatMessageAPIType, StatusWSType } from '../../types/types'

let ws: WebSocket | null = null

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
}

const notifySubscribersAboutStatus = (status: StatusWSType) => {
  subscribers['status-changed'].forEach((s) => s(status))
}

const reconnect = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach((s) => s(newMessages))
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
}

const cleanUp = () => {
  ws?.removeEventListener('close', reconnect)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const createChannel = () => {
  cleanUp()
  ws?.close()

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  )

  notifySubscribersAboutStatus('pending')

  ws.addEventListener('close', reconnect)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

const chatAPI = {
  start() {
    createChannel()
  },

  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []

    cleanUp()
    ws?.close()
  },

  subscribe(
    eventName: EventsCustomNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  },
}

type EventsCustomNamesType = 'messages-received' | 'status-changed'

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusWSType) => void

export default chatAPI
