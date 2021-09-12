import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import cn from 'classnames'
import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js'
import s from './Members.module.scss'

import useResizeWindow from '../../../hooks/useResizeWindow'

import ButtonSort from './ButtonSort/BurronSort'
import Avatar from '../../common/Avatar/Avatar'
import Name from '../../common/Name/Name'

import { getChatMembers } from '../../../redux/selectors/chat-selectors'
import { ChatMessageAPIType, ChatMessageType } from '../../../types/types'

const Members: React.FC<{ theme: string }> = ({ theme }) => {
  const chatMembers = useSelector(getChatMembers)

  const [isShowAll, setIsShowAll] = useState(false)
  const [isReverseSort, setIsReverseSort] = useState(false)
  const [isShowMembers, setIsShowMembers] = useState(false)
  const widthScreen = useResizeWindow()

  const handleClickTitle = () => {
    if (widthScreen <= 760) {
      if (isShowMembers) {
        setIsShowMembers(false)
      } else {
        setIsShowMembers(true)
      }
    }
  }

  const itemsCount = isShowAll ? chatMembers.length : 2

  const sortMembers = (a: ChatMessageType, b: ChatMessageType): number =>
    isReverseSort
      ? b.userName.localeCompare(a.userName)
      : a.userName.localeCompare(b.userName)

  return (
    <section hidden={!chatMembers.length} className={s.container}>
      <div
        aria-hidden='true'
        className={cn(s.titleWrap, { [s.titleWrapDeployed]: isShowMembers })}
        onClick={handleClickTitle}
      >
        <h1 className={s.title}>Members</h1>
        <Icon
          className={s.titleArrow}
          path={mdiChevronDown}
          title='ArrowShowMembers'
          size='18px'
        />
      </div>

      <ButtonSort
        theme={theme}
        isShowAll={isShowAll}
        isShowMembers={isShowMembers}
        isReverseSort={isReverseSort}
        setIsReverseSort={setIsReverseSort}
      />

      <div
        className={cn(
          { [s.members]: isShowMembers },
          { [s.notShowMembers]: !isShowMembers }
        )}
      >
        {chatMembers &&
          [...chatMembers]
            .slice(0, itemsCount)
            .sort(sortMembers)
            .map((u: ChatMessageAPIType) => (
              <div className={s.member} key={u.userId}>
                <Avatar photo={u.photo} size='small' id={u.userId} />

                <div className={s.wrapName}>
                  <Name id={u.userId} name={u.userName} size='small' />
                </div>
              </div>
            ))}

        {chatMembers.length > 2 && !isShowAll ? (
          <div className={s.showAllWrap}>
            <span
              aria-hidden='true'
              className={s.showAll}
              onClick={() => setIsShowAll(true)}
            >
              show all {chatMembers.length} ...
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}

export default Members
