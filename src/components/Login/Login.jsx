import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';

import { loginThunk, logoutThunk } from '../../redux/auth-reducer';
import s from './Login.module.css';
import cn from 'classnames';

import renderTextField from '../common/ElementCustom/renderTextField';
import renderCheckbox from '../common/ElementCustom/renderCheckbox';
import Button from '@material-ui/core/Button';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
    'captcha'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (values.email
    && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Login = (props) => {

  const onSubmit = (formData) => {
    props.loginThunk(
      formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={`/profile/${props.id}`} />
  }

  return <div className={s.wrap}>
    <div className={s.body}>
      <h1>Log in</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        logoutThunk={logoutThunk}
        captchaURL={props.captchaURL} />
    </div>
  </div>
}

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return <>
    <form onSubmit={handleSubmit}>
      <div className={s.row}>
        <Field
          component={renderTextField}
          name='email'
          label='Email:'
          type="email"
          fullWidth={true}
        />
      </div>
      <div className={s.row}>
        <Field
          component={renderTextField}
          name='password'
          label='Password:'
          type="password"
          fullWidth={true}
        />
      </div>
      <div className={cn(s.row, s.rowCheckbox)}>
        <Field
          component={renderCheckbox}
          name='rememberMe'
          label='Remember me'
        />
      </div>

      {captchaURL && <img src={captchaURL} alt='captcha' />}
      {captchaURL &&
        <Field
          component={renderTextField}
          fullWidth={true}
          name='captcha' />
      }

      <div className={s.row}>
        <Button
          type='submit'
          variant="contained"
          color="primary"
          style={{ width: '100%', fontSize: 16, fontWeight: 'bold', color: '#fff' }}
        >Log in</Button>

        {error &&
          <div className={s.formError}>
            {error}
          </div>
        }
      </div>
    </form>
  </>
}

const LoginReduxForm = reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);


const mapStateToProps = (state) => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth,
  id: state.auth.id,
});

export default connect(mapStateToProps, {
  loginThunk,
  logoutThunk
})(Login);