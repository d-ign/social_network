import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Icon from '@mdi/react'
import { TextField, Button } from '@material-ui/core'
import { mdiChevronDown } from '@mdi/js'
import s from './Chat.module.scss'

import withAuthRedirect from '../common/hoc/withAuthRedirect'
import Avatar from '../common/Avatar/Avatar'

import { getTheme } from '../../redux/selectors/app-selectors'
import { getAuthorizedUserID } from '../../redux/selectors/auth-selectors'
import {
  getChatMembers,
  getMessages,
  getStatus,
} from '../../redux/selectors/chat-selectors'
import {
  ChatMessageType,
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/reducers/chat-reducer'
import { ChatMessageAPIType } from '../../api/chat-api'

const Chat: React.FC = () => {
  const status = useSelector(getStatus)
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
        <Members />
      </div>
      <AddMessageForm />
    </div>
  )
}

const Members: React.FC = () => {
  const chatMembers = useSelector(getChatMembers)
  const [isShowAll, setIsShowAll] = useState(false)
  const [isReverseSort, setIsReverseSort] = useState(false)
  const itemsCount = isShowAll ? chatMembers.length : 5
  const [isShowMembers, setIsShowMembers] = useState(false)

  const stylesSortByName = {
    fontSize: '10px',
    marginBottom: '5px',
    padding: '3px 10px 3px 7px',
  }

  return (
    <div
      className={cn(s.membersContainer, {
        [s.membersContainerHidden]: !chatMembers.length,
      })}
    >
      <div
        aria-hidden='true'
        className={cn(
          s.titleMembersWrap,
          { [s.titleMembersWrapDeployed]: isShowMembers },
          { [s.buttonSortWrapHiddenNotShowAll]: !isShowAll }
        )}
        onClick={() =>
          isShowMembers ? setIsShowMembers(false) : setIsShowMembers(true)
        }
      >
        <div className={s.titleMembers}>Members</div>
        <Icon
          className={s.titleMembersArrow}
          path={mdiChevronDown}
          title='ArrowShowMembers'
          size='18px'
        />
      </div>

      <div
        className={cn(
          s.buttonSortWrap,
          { [s.buttonSortMedia]: isShowMembers },
          { [s.buttonSortNotShowMembers]: !isShowMembers },
          { [s.buttonSortNotShowAll]: !isShowAll }
        )}
      >
        <Button
          onClick={() =>
            isReverseSort ? setIsReverseSort(false) : setIsReverseSort(true)
          }
          startIcon={
            isReverseSort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
          }
          style={stylesSortByName}
        >
          sort by name
        </Button>
      </div>

      <div
        className={cn(
          { [s.chatMembersMedia]: isShowMembers },
          { [s.chatMembersNotShowMembers]: !isShowMembers },
          { [s.buttonSortNotShowAll]: !isShowAll }
        )}
      >
        {chatMembers &&
          chatMembers
            .slice(0, itemsCount)
            .sort((a: ChatMessageType, b: ChatMessageType): number =>
              isReverseSort
                ? b.userName.localeCompare(a.userName)
                : a.userName.localeCompare(b.userName)
            )
            .map((u: ChatMessageAPIType) => (
              <div className={s.member} key={u.userId}>
                <NavLink to={`/profile/${u.userId}`}>
                  <Avatar photo={u.photo} size='small' />
                </NavLink>
                <NavLink
                  className={cn(s.name, s.nameMember)}
                  to={`/profile/${u.userId}`}
                >
                  {u.userName}
                </NavLink>
              </div>
            ))}

        {chatMembers.length > 5 && !isShowAll ? (
          <div className={s.showAllWrap}>
            <span
              aria-hidden='true'
              className={s.showAll}
              onClick={() => setIsShowAll(true)}
            >
              show all...
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

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
      className={cn(s.allMessages, { [s.allMessagesAbsent]: !messages.length })}
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
          <div className={s.avatarSmall}>
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

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = React.useState('')
  const theme = useSelector(getTheme)
  const status = useSelector(getStatus)
  const dispatch = useDispatch()

  const handleSendMessage = () => {
    if (!message.trim()) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.currentTarget.value)
          }
          value={message}
        />
        <IconButton
          aria-label='sendMessage'
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
