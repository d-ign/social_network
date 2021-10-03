import React, { Dispatch, SetStateAction } from 'react'

import cn from 'classnames'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { Button } from '@material-ui/core'
import s from './ChatButtonSort.module.scss'

import { ThemeType } from '../../../../types/types'

type PropsType = {
  theme: ThemeType
  isShowAll: boolean
  isShowMembers: boolean
  isReverseSort: boolean
  setIsReverseSort: Dispatch<SetStateAction<boolean>>
}

const ChatButtonSort: React.FC<PropsType> = (props) => {
  const { theme, isReverseSort, setIsReverseSort, isShowAll, isShowMembers } =
    props

  const stylesSortByName: React.CSSProperties = {
    fontSize: '10px',
    marginBottom: '5px',
    padding: '3px 10px 3px 7px',
  }

  const handleClick = () =>
    isReverseSort ? setIsReverseSort(false) : setIsReverseSort(true)

  return (
    <div
      className={cn(
        s.buttonSortWrap,
        { [s.buttonSort]: isShowMembers },
        { [s.buttonSortNotShowMembers]: !isShowMembers }
      )}
    >
      <Button
        onClick={handleClick}
        disabled={!isShowAll}
        startIcon={isReverseSort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        style={stylesSortByName}
        color={theme === 'theme1' ? 'primary' : 'secondary'}
      >
        sort by name
      </Button>
    </div>
  )
}

export default ChatButtonSort
