import React from 'react';

import s from './Search.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../common/ElementCustom/InputCustomSearchUsers';

type PropsType = {
  termOfUrl?: string
  totalUsersCount: number
  searchUsers: (term: string) => void
}

const Search: React.FC<PropsType> = React.memo(({ termOfUrl, searchUsers, totalUsersCount }) => {

  const classes = useStyles();

  return <div className={s.search}>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search by name..."
        inputProps={{ 'aria-label': 'search' }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={termOfUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          searchUsers(e.target.value)
        }}
      />
    </div>
    <div className={s.searchCount}>
      Total: {totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
      {/* добавление пробела между числами: (?=pattern)+ - жадное повторение последнего шаблона один или несколько раз до конца строки $ */}
    </div>
  </div>
})

export default Search;