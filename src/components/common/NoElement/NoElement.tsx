import React from 'react'
import s from './NoElement.module.scss'

type PropsType = {
  elements: string
  writeSomething: boolean
}

const NoElement: React.FC<PropsType> = ({ elements, writeSomething }) => {
  return (
    <div className={s.container}>
      <span>{`No ${elements} ${elements === 'users' ? 'found' : ''}`}</span>
      {writeSomething && <span>Write something!</span>}
    </div>
  )
}

export default NoElement
