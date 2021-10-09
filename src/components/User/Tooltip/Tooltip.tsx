import React, { memo } from 'react'
import './Tooltip.module.scss'

type PropsType = {
  element: string
  children: React.ReactNode
}

const Tooltip: React.FC<PropsType> = ({ element, children }) => {
  return <div data-tooltip={element}>{children}</div>
}

export default memo(Tooltip)
