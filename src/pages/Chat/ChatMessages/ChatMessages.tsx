import React, { useEffect, useRef, useState, memo } from 'react'

import s from './ChatMessages.module.scss'

import ChatMessage from './ChatMessage/ChatMessage'
import NoElement from '../../../components/NoElement/NoElement'
import { useAppSelector } from '../../../services/hooks/useApp'

import { getMessages } from '../../../store/selectors/chat-selectors'

import { ChatMessageType } from '../../../types/types'

const ChatMessages: React.FC = () => {
  const messages = useAppSelector(getMessages)
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
    <section className={s.container} onScroll={handleScroll}>
      <h1 className={s.visuallyHidden}>Chat messages</h1>
      {messages.length ? (
        messages
          .filter((m: ChatMessageType) => m.message.trim().length > 0)
          .map((m: ChatMessageType) => <ChatMessage key={m.id} message={m} />)
      ) : (
        <NoElement elements='messages' writeSomething />
      )}
      <div ref={lastElement} />
    </section>
  )
}

export default memo(ChatMessages)
