import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import { TextField } from '@material-ui/core'
import s from './Chat.module.scss'

import withAuthRedirect from '../../hoc/withAuthRedirect'
import Members from './Members/Members'
import Messages from './Messages/Messages'

import { getTheme } from '../../redux/selectors/app-selectors'
import { getStatusWS } from '../../redux/selectors/chat-selectors'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/reducers/chat-reducer'

import { StatusWSType } from '../../types/types'

const Chat: React.FC = () => {
  const status = useSelector(getStatusWS)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return (
    <div className={s.chat}>
      {/* error появляется, когда пропадает интернет, на несколько
      миллисекунд и сменяется другим статусом? */}
      {status === 'error' && (
        <div>Some error occured. Please, refresh the page...</div>
      )}
      <div className={s.membersAndMessages}>
        <Messages />
        <Members theme={theme} />
      </div>
      <AddMessageForm theme={theme} status={status} />
    </div>
  )
}

type FormPropsType = {
  theme: string
  status: StatusWSType
}

const AddMessageForm: React.FC<FormPropsType> = ({ theme, status }) => {
  const dispatch = useDispatch()
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
