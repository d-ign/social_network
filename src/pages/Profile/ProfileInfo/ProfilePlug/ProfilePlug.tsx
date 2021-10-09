import React from 'react'
import s from './ProfilePlug.module.scss'

type PropsType = {
  isOwner: boolean
}

const ProfilePlug: React.FC<PropsType> = ({ isOwner }) => {
  return (
    <div className={s.container}>
      <div className={s.columnLeft}>
        <div className={s.avatar} />
        {isOwner && <div className={s.button} />}
      </div>

      <div className={s.columnRight}>
        <div className={s.nameWrap}>
          <div className={s.name} />
        </div>

        <div className={s.status} />

        <div className={s.titleOne} />
        <div className={s.text} />
        <div className={s.titleTwo} />
        <div className={s.text} />
      </div>
    </div>
  )
}

export default ProfilePlug
