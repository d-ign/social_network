import React, { useEffect, useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import { TextField } from '@material-ui/core'
import s from './Chat.module.scss'

import ChatMembers from './ChatMembers/ChatMembers'
import ChatMessages from './ChatMessages/ChatMessages'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../hooks/useApp'

import { getTheme } from '../../redux/selectors/app-selectors'
import { getStatusWS } from '../../redux/selectors/chat-selectors'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/reducers/chat-reducer'

import { StatusWSType, ThemeType } from '../../types/types'

const Chat: React.FC = () => {
  const status = useAppSelector(getStatusWS)
  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return (
    <main className={s.chat}>
      {status === 'error' && (
        <div>Some error occured. Please, refresh the page...</div>
      )}
      <div className={s.membersAndMessages}>
        <ChatMessages />
        <ChatMembers theme={theme} />
      </div>
      <AddMessageForm theme={theme} status={status} />
    </main>
  )
}

type FormPropsType = {
  theme: ThemeType
  status: StatusWSType
}

const AddMessageForm: React.FC<FormPropsType> = ({ theme, status }) => {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (!message.trim()) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value)

  return (
    <div className={s.wrapForm}>
      <div className={s.form}>
        <TextField
          name='newMessageText'
          placeholder='Enter your message...'
          fullWidth
          variant='outlined'
          inputProps={{ maxLength: 100 }}
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          onChange={handleChangeInput}
          value={message}
        />
        <IconButton
          title='Send message'
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          style={{ margin: '5px' }}
          onClick={handleSendMessage}
          disabled={status === 'pending'}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withAuthRedirect(Chat)
