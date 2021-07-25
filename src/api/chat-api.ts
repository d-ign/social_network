let ws: WebSocket | null = null;

let subscribers = {
  'messages-received': [] as Array<MessagesReceivedSubscriberType>,
  'status-changed': [] as Array<StatusChangedSubscriberType>
}

type EventsCustomNamesType = 'messages-received' | 'status-changed'

const notifySubscribersAboutStatus = (status: StatusType) => {
  if (subscribers) {
    subscribers["status-changed"].forEach(s => s(status))
  }
}

const reconnect = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  let newMessages = JSON.parse(e.data);
  if (subscribers) {
    subscribers['messages-received'].forEach(s => s(newMessages));
  }
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('REFRESH PAGE')
}

const cleanUp = () => {
  ws?.removeEventListener('close', reconnect)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

function createChannel() {
  cleanUp()
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

  notifySubscribersAboutStatus('pending')

  ws.addEventListener('close', reconnect)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    if (subscribers) {
      subscribers['messages-received'] = []
      subscribers['status-changed'] = []
    }
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsCustomNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    if (subscribers) {
      // @ts-ignore
      subscribers[eventName].push(callback)
    }
  },

  // отписка (забираем возможность api уведомлять store)
  unsubscribe(eventName: EventsCustomNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    if (subscribers) {
      // @ts-ignore
      subscribers = subscribers[eventName]?.filter(s => s !== callback) // оставляем всех, кроме callback
    }
  },

  sendMessage(message: string) {
    ws?.send(message)
  }
}

export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: Array<ChatMessageAPIType>) => void

type StatusChangedSubscriberType = (status: StatusType) => void