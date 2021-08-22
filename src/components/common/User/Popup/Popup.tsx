import React from 'react'
import './Popup.module.scss'

type PropsType = {
  element: string
  children: React.ReactNode
}

const Popup: React.FC<PropsType> = ({ element, children }) => {
  return <div data-tooltip={element}>{children}</div>
}

export default Popup
