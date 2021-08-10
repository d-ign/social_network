import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import cn from 'classnames'
import s from './Message.module.scss'

import Avatar from '../../../common/Avatar/Avatar'
import { getAuthorizedUserID } from '../../../../redux/selectors/auth-selectors'
import { ChatMessageAPIType } from '../../../../api/chat-api'

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    const myID = useSelector(getAuthorizedUserID)

    return (
      <div
        className={cn(s.messageContainer, {
          [s.myMessageContainer]: myID === message.userId,
        })}
      >
        <NavLink to={`/profile/${message.userId}`}>
          <div className={s.avatarMedium}>
            <Avatar photo={message.photo} size='medium' />
          </div>
          <div hidden className={s.avatarSmall}>
            <Avatar photo={message.photo} size='small' />
          </div>
        </NavLink>
        <div className={s.nameAndMessage}>
          <NavLink className={s.name} to={`/profile/${message.userId}`}>
            {message.userName}
          </NavLink>
          <div className={s.message}>{message.message}</div>
        </div>
      </div>
    )
  }
)

export default Message
