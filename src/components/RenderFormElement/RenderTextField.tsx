import { InputProps, TextField } from '@mui/material'
import { useAppSelector } from '../../services/hooks/useApp'
import { getTheme } from '../../store/selectors/app-selectors'

import s from './RenderTextField.module.scss'

type OwnPropsType = {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
  variant: 'outlined' | 'standard' | 'filled'
  meta: { touched: boolean; error: string; warning: string }
}

const RenderTextField = (props: InputProps & OwnPropsType) => {
  const {
    label,
    input,
    placeholder,
    multiline,
    variant,
    inputProps,
    onInput,
    onFocus,
    meta: { touched, error, warning },
    fullWidth,
    ...custom
  } = props

  const theme = useAppSelector(getTheme)

  return (
    <>
      <TextField
        color={theme === 'theme1' ? 'primary' : 'secondary'}
        label={label}
        InputLabelProps={{ htmlFor: label }}
        inputProps={{ ...inputProps, id: label }}
        onInput={onInput}
        onFocus={onFocus}
        variant={variant}
        multiline={multiline}
        fullWidth={fullWidth}
        placeholder={placeholder}
        {...input}
        {...custom}
      />
      {touched &&
        ((error && <span className={s.error}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </>
  )
}

export default RenderTextField
