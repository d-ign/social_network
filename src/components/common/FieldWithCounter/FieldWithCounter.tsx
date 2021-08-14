import { useState } from 'react'
import { Field } from 'redux-form'

import cn from 'classnames'
import s from './FieldWithCounter.module.scss'
import renderTextField from '../ElementCustom/renderTextField'

type PropsType = {
  name: string
  label: string
  placeholder: string
  multiline?: boolean
  maxLength: number
  handleOnEditInputForm: (bool: boolean) => void
}

const FieldWithCounter: React.FC<PropsType> = (props) => {
  const {
    name,
    label,
    multiline,
    maxLength,
    placeholder,
    handleOnEditInputForm,
  } = props

  const [isHiddenCounter, setIsHiddenCounter] = useState(true)
  const [count, setCount] = useState(0)

  const onFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnEditInputForm(true)
    setCount(e.target.value.length)
  }
  const onFieldFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    setCount(e.target.value.length)
    setIsHiddenCounter(false)
  }
  const onFieldBlur = () => {
    setIsHiddenCounter(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Field
        component={renderTextField}
        inputProps={{ maxLength }}
        placeholder={placeholder}
        multiline={multiline}
        label={label}
        name={name}
        variant='filled'
        fullWidth
        onInput={onFieldInput}
        onFocus={onFieldFocus}
        onBlur={onFieldBlur}
      />
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
