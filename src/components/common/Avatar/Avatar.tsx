import React from 'react'
import { NavLink } from 'react-router-dom'

import cn from 'classnames'
import unknown from '../../../img/no_photo.svg'
import s from './Avatar.module.scss'

type PropsType = {
  photo: string | null
  size: 'small' | 'medium' | 'large' | 'extra-large'
}

type OwnPropsType = {
  id: number | null
}

const Avatar: React.FC<PropsType & OwnPropsType> = ({
  photo,
  size,
  id,
  children,
}) => {
  // Проверка тестового аккаунта с id = 1079:
  // установленное фото на тестовый аккаунт удаляется через короткое время
  // на сервере и, если с этого аккаунта написано сообщение в чат, то
  // при отрисовке этого сообщения (с удалённым фото) в ответ приходит
  // ошибка вместо null | undefined, вскоре сервер опять присылает null
  // вместо фото, но это происходит не сразу. Для этого случая эта проверка
  let photoTrue
  if (photo?.includes('1079')) {
    photoTrue = null
  } else {
    photoTrue = photo
  }

  return (
    <>
      {id ? (
        <NavLink to={`/profile/${id}`} replace>
          <AvatarBody photo={photoTrue} size={size}>
            {children}
          </AvatarBody>
        </NavLink>
      ) : (
        <AvatarBody photo={photoTrue} size={size}>
          {children}
        </AvatarBody>
      )}
    </>
  )
}

const AvatarBody: React.FC<PropsType> = ({ photo, size, children }) => {
  return (
    <div className={s.avatarWrap}>
      <div
        className={cn(
          s.avatar,
          { [s.extra_large]: size === 'extra-large' },
          { [s.large]: size === 'large' },
          { [s.medium]: size === 'medium' },
          { [s.small]: size === 'small' }
        )}
      >
        <img src={photo || unknown} alt='avatar' />
      </div>
      {children}
    </div>
  )
}

export default Avatar
