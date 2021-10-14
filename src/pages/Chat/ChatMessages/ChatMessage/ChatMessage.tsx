import React, { memo } from 'react'

import cn from 'classnames'
import s from './ChatMessage.module.scss'

import Avatar from '../../../../components/Avatar/Avatar'
import Name from '../../../../components/Name/Name'
import { useAppSelector } from '../../../../services/hooks/useApp'

import { getAuthorizedUserID } from '../../../../store/selectors/auth-selectors'

import { ChatMessageAPIType } from '../../../../types/types'

const ChatMessage: React.FC<{ message: ChatMessageAPIType }> = ({
  message: { userId, photo, userName, message },
}) => {
  const myID = useAppSelector(getAuthorizedUserID)

  return (
    <article
      className={cn(s.messageContainer, {
        [s.myMessageContainer]: myID === userId,
      })}
    >
      <div className={s.avatar_size_medium}>
        <Avatar photo={photo} size='medium' id={userId} />
      </div>
      <div hidden className={s.avatar_size_small}>
        <Avatar photo={photo} size='small' id={userId} />
      </div>

      <div className={s.nameAndMessage}>
        <Name id={userId} name={userName} />
        <div className={s.message}>{message}</div>
      </div>
    </article>
  )
}

export default memo(ChatMessage)
