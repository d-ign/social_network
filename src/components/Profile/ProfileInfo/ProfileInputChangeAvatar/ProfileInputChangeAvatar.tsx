import React from 'react'

import cn from 'classnames'
import s from './ProfileInputChangeAvatar.module.scss'
import camera from '../../../../img/icons/camera.svg'

type PropsType = {
  isOwner: boolean
  isEditModeProfile: boolean
  handleChangeAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileInputChangeAvatar: React.FC<PropsType> = ({
  isOwner,
  isEditModeProfile,
  handleChangeAvatar,
}) => (
  <>
    {isOwner && !isEditModeProfile && (
      <div className={s.container} title='Change avatar'>
        <label htmlFor='file_out'>
          <input
            type='file'
            id='file_out'
            className={s.visuallyHidden}
            onChange={handleChangeAvatar}
          />
          <span
            className={cn(s.wrapImg, s.elementInteractive)}
            style={{ borderRadius: '50%' }}
          >
            <img src={camera} alt='change avatar' />
          </span>
        </label>
      </div>
    )}
  </>
)

export default ProfileInputChangeAvatar
