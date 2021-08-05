import React from 'react'
import cn from 'classnames'
import unknown from '../../../img/no_photo.svg'
import s from './Avatar.module.css'

type SizeType = 'small' | 'medium' | 'large'

type PropsType = {
  photo: string | null | undefined
  size: SizeType
}

const Avatar: React.FC<PropsType> = ({ photo, size, children }) => (
  <div className={s.avatarWrap}>
    <div
      className={cn(
        s.avatar,
        { [s.large]: size === 'large' },
        { [s.medium]: size === 'medium' },
        { [s.small]: size === 'small' }
      )}
    >
      <img src={photo || unknown} alt='avatar' />
      {children}
    </div>
  </div>
)

export default Avatar
