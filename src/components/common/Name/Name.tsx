import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import cn from 'classnames'
import s from './Name.module.scss'

type PropsType = {
  id: number | undefined
  name: string | undefined
  size: 'small' | 'normal'
}

const Name: React.FC<PropsType> = ({ id, name, size = 'normal' }) => {
  return (
    <span>
      <NavLink
        className={cn(s.name, { [s.name__small]: size === 'small' })}
        to={`/profile/${id || '/login'}`}
        replace
      >
        {name || 'no name'}
      </NavLink>
    </span>
  )
}

export default memo(Name)
