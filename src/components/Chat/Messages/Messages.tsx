import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import s from './Messages.module.scss'

import Message from './Message/Message'
import NoElement from '../../common/NoElement/NoElement'

import { getMessages } from '../../../redux/selectors/chat-selectors'
import { ChatMessageType } from '../../../redux/reducers/chat-reducer'

const Messages: React.FC = () => {
  const messages = useSelector(getMessages)
  const lastElement = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const scrollButton = el.scrollHeight - el.scrollTop - el.clientHeight

    if (Math.abs(scrollButton) < 1) {
      if (!isAutoScroll) setIsAutoScroll(true)
    } else if (isAutoScroll) setIsAutoScroll(false)
  }

  useEffect(() => {
    if (isAutoScroll) {
      lastElement.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAutoScroll])

  return (
    <div className={s.container} onScroll={handleScroll}>
      {messages.length ? (
        messages
          .filter((m) => m.message.trim().length > 0)
          .map((m: ChatMessageType) => <Message key={m.id} message={m} />)
      ) : (
        <NoElement elements='messages' writeSomething />
      )}
      <div ref={lastElement} />
    </div>
  )
}

export default Messages
