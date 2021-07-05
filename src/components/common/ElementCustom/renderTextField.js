import { TextField } from '@material-ui/core';

const renderTextField = (props) => {
  const { label, input, placeholder, multiline, variant, inputProps, onInput, onFocus, meta: { touched, error, warning }, fullWidth, ...custom } = props;

  return <>
    <TextField
      label={label}
      placeholder={placeholder}
      inputProps={inputProps}
      onInput={onInput}
      onFocus={onFocus}
      variant={variant}
      multiline={multiline}
      fullWidth={fullWidth}
      {...input}
      {...custom}
    />
    {
      touched && (
        (error &&
          <span style={{ color: 'red' }}>{error}</span>)
        || (warning && <span>{warning}</span>)
      )
    }
  </>
}

export default renderTextField;