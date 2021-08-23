import React from 'react'
import debounce from 'lodash/debounce'

import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './stylesCustomMaterialUI'
import s from './Search.module.scss'

type PropsType = {
  termOfUrl?: string
  pathname: string
  totalUsersCount: number
  searchUsers: (term: string) => void
}

const Search: React.FC<PropsType> = React.memo((props) => {
  const { pathname, termOfUrl = '', searchUsers, totalUsersCount } = props
  const classes = useStyles()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    searchUsers(e.target.value)

  return (
    <div className={s.container}>
      <div className={s.wrap}>
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
            onInput={debounce(handleChange, 600)}
          />
        )}
      </div>
      <div className={s.searchCount}>
        Total: {totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
        {/* добавление пробела между числами: (?=pattern)+ - жадное
          повторение последнего шаблона один или несколько раз
          до конца строки $ */}
      </div>
    </div>
  )
})

export default Search
