import React from 'react';

import s from './Search.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../common/ElementCustom/InputCustomSearchUsers';

type PropsType = {
  totalUsersCount: number
  pathname: string
  searchUsers: (term: string) => void
}

const Search: React.FC<PropsType> = (props) => {
  const classes = useStyles();

  // очистка поиска при смене url
  let [currentTerm, setCurrentTerm] = React.useState('');
  React.useEffect(() => {
    setCurrentTerm('')
  }, [props.pathname])

  return <div className={s.search}>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search by name..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={currentTerm}
        inputProps={{ 'aria-label': 'search' }}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.searchUsers(e.target.value)
          setCurrentTerm(e.target.value)
        }
        }
      />
    </div>
    <div className={s.searchCount}>
      Total: {props.totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
      {/* добавление пробела между числами: (?=pattern)+ - жадное повторение последнего шаблона один или несколько раз до конца строки $ */}
    </div>
  </div>
}

export default Search;