import React, { useCallback, memo, useMemo, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './stylesCustomMaterialUI'
import s from './Search.module.scss'

import Prompt from '../Prompt/Prompt'

type PropsType = {
  pathname: string
  termOfUrl: string
  isFetching: boolean
  totalUsersCount: number
  searchUsers: (term: string) => void
}

const Search: React.FC<PropsType> = (props) => {
  const { pathname, termOfUrl, searchUsers, totalUsersCount, isFetching } =
    props
  const classes = useStyles()

  const [isShowPrompt, setIsShowPrompt] = useState(true)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchUsers(e.target.value)
      setIsShowPrompt(false)
    },
    [searchUsers]
  )

  const handleDebounce = useMemo(
    () => debounce(handleChange, 600),
    [handleChange]
  )

  useEffect(() => {
    return function cleanup() {
      handleDebounce.cancel()
    }
  })

  return (
    <div className={s.container}>
      <div className={s.searchWrap}>
        <div className={s.searchIcon}>
          <SearchIcon />
        </div>
        {pathname === '/users' && (
          <InputBase
            placeholder='Search by name...'
            inputProps={{ 'aria-label': 'search' }}
            classes={{ input: classes.search }}
            value={termOfUrl}
            onChange={handleChange}
          />
        )}
        {pathname === '/friends' && (
          <InputBase
            placeholder='Search by name...'
            inputProps={{ 'aria-label': 'search' }}
            classes={{ input: classes.search }}
            onInput={handleDebounce}
          />
        )}
      </div>
      <div className={s.searchCount}>
        Total: {totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
        {/* adding space between numbers: (? = pattern) + - greedy repeating
        the last pattern one or more times to the end of the line $ */}
      </div>

      {isShowPrompt && !isFetching && (
        <Prompt.SearchUsers pathname={pathname} />
      )}
    </div>
  )
}

export default memo(Search)
