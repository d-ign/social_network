import React from 'react'
import s from './ProfilePlug.module.scss'

type PropsType = {
  isOwner: boolean
}

const ProfilePlug: React.FC<PropsType> = ({ isOwner }) => {
  return (
    <div className={s.containerMainPlug}>
      <div className={s.columnLeftPlug}>
        <div className={s.avatarPlug} />
        {isOwner && <div className={s.buttonPlug} />}
      </div>

      <div className={s.columnRightPlug}>
        <div className={s.nameWrapPlug}>
          <div className={s.namePlug} />
        </div>

        <div className={s.statusPlug} />

        <div className={s.titleOnePlug} />
        <div className={s.textPlug} />
        <div className={s.titleTwoPlug} />
        <div className={s.textPlug} />
      </div>
    </div>
  )
}

export default ProfilePlug
