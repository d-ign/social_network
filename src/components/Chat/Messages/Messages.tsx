import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import cn from 'classnames'
import s from './Messages.module.scss'

import Message from './Message/Message'

import { getMessages } from '../../../redux/selectors/chat-selectors'
import { ChatMessageType } from '../../../redux/reducers/chat-reducer'

const Messages: React.FC = () => {
  const messages = useSelector(getMessages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 1
    ) {
      if (!isAutoScroll) setIsAutoScroll(true)
    } else if (isAutoScroll) setIsAutoScroll(false)
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAutoScroll])

  return (
    <div
      className={cn(s.container, { [s.containerNoMessages]: !messages.length })}
      onScroll={scrollHandler}
    >
      {messages.length ? (
        messages
          .filter((m) => m.message.trim().length > 0)
          .map((m: ChatMessageType) => <Message key={m.id} message={m} />)
      ) : (
        <div className={s.noMessages}>
          No messages yet...
          <br />
          Write something!
        </div>
      )}
      <div ref={messagesAnchorRef} />
    </div>
  )
}

export default Messages
