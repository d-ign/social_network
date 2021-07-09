import React from 'react';

import s from './Search.module.css';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../../components/common/ElementCustom/InputCustomSearchUsers';

const Search = (props) => {
  const classes = useStyles();

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
          inputProps={{ 'aria-label': 'search' }}
          onInput={(e) => props.onPageChanged(1, e.target.value)}
        />
      </div>
      <div className={s.searchCount}>
        Total: {props.totalUsersCount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
        {/* добавление пробела между числами: (?=pattern)+ - жадное повторение последнего шаблона один или несколько раз до конца строки $ */}
      </div>
    </div>
}

export default Search;