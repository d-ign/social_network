import { useState } from 'react'

import cn from 'classnames'
import s from './FieldWithCounter.module.scss'

type PropsType = {
  renderContent: (
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void,
    handleBlur: () => void
  ) => JSX.Element
  maxLength: number
  setIsEditInputProfileForm: (bool: boolean) => void
}

const FieldWithCounter: React.FC<PropsType> = (props) => {
  const { maxLength, renderContent, setIsEditInputProfileForm } = props

  const [isHiddenCounter, setIsHiddenCounter] = useState(true)
  const [count, setCount] = useState(0)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditInputProfileForm(true)
    setCount(e.target.value.length)
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    setCount(e.target.value.length)
    setIsHiddenCounter(false)
  }
  const handleBlur = () => {
    setIsHiddenCounter(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderContent(handleInput, handleFocus, handleBlur)}

      <span
        className={cn(
          s.count,
          { [s.countHidden]: isHiddenCounter },
          { [s.countYellow]: count >= maxLength - 10 },
          { [s.countRed]: count === maxLength }
        )}
      >
        {count} of {maxLength}
      </span>
    </div>
  )
}

export default FieldWithCounter
