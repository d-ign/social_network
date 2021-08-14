import React from 'react'
import cn from 'classnames'
import unknown from '../../../img/no_photo.svg'
import s from './Avatar.module.scss'

type SizeType = 'small' | 'medium' | 'large'

type PropsType = {
  photo: string | null | undefined
  size?: SizeType
}

const Avatar: React.FC<PropsType> = ({ photo, size = 'medium', children }) => {
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
    <div className={s.avatarWrap}>
      <div
        className={cn(
          s.avatar,
          { [s.large]: size === 'large' },
          { [s.medium]: size === 'medium' },
          { [s.small]: size === 'small' }
        )}
      >
        <img src={photoTrue || unknown} alt='avatar' />
        {children}
      </div>
    </div>
  )
}

export default Avatar
