import React from 'react';
import s from './FormsControls.module.css'

export const Element = Element =>
  ({ input, meta: { touched, error }, ...props }) => {
    const showError = touched && error;
    // touched = значит кликнули и ушли
    // debugger
    return (
      <div className={s.formControl + " " + (showError ? s.error : "")}>
        <Element {...input} {...props} />
        {showError && <span>{error}</span>}
      </div>
    )
  };