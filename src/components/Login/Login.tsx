import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { loginThunk } from '../../redux/reducers/auth-reducer';
import s from './Login.module.css';
import cn from 'classnames';

import renderTextField from '../common/ElementCustom/renderTextField';
import renderCheckbox from '../common/ElementCustom/renderCheckbox';
import Button from '@material-ui/core/Button';
import { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';

const validate = (values: LoginFormValuesType) => {

  type ErrorsType = {
    email?: string
    password?: string
    captcha?: string
  }

  const errors: ErrorsType = {}
  const requiredFields = [
    'email',
    'password',
    'captcha'
  ]

  requiredFields.forEach(field => {
    if (!values[field as keyof LoginFormValuesType]) {
      errors[field as keyof ErrorsType] = 'Required'
    }
  })

  if (values.email
    && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}




type MapStatePropsType = {
  captchaURL: string | null
  isAuth: boolean
  userID: number | null
}

type MapDispatchPropsType = {
  loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type OwnPropsType = {
  captchaURL: string | null
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}



const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  const onSubmit = (values: LoginFormValuesType) => {
    props.loginThunk(
      values.email, values.password, values.rememberMe, values.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={`/profile/${props.userID}`} />
  }

  return <div className={s.wrap}>
    <div className={s.body}>
      <h1>Log in</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaURL={props.captchaURL} />
    </div>
  </div>
}



const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({ handleSubmit, error, captchaURL }) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({
  form: 'loginForm',
  validate,
})(LoginForm);

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth,
  userID: state.auth.userID,
});

export default compose<React.ComponentType>(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps, {loginThunk}
), )(Login);