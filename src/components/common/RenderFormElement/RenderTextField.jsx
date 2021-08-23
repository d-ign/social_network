import { useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import { getTheme } from '../../../redux/selectors/app-selectors'

import s from './RenderTextField.module.scss'

const RenderTextField = (props) => {
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

  const theme = useSelector(getTheme)

  return (
    <>
      <TextField
        color={theme === 'theme1' ? 'primary' : 'secondary'}
        label={label}
        InputLabelProps={{ for: label }}
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
