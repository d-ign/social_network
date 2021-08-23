import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import cn from 'classnames'
import Button from '@material-ui/core/Button'
import s from './Login.module.scss'
import RenderTextField from '../common/ElementCustom/RenderTextField'
import RenderCheckbox from '../common/ElementCustom/RenderCheckbox'

import {
  getAuthorizedUserID,
  getCaptchaURL,
  getIsAuth,
} from '../../redux/selectors/auth-selectors'
import { getTheme } from '../../redux/selectors/app-selectors'
import { loginThunk } from '../../redux/reducers/auth-reducer'

const validate = (values: LoginFormValuesType) => {
  type ErrorsType = {
    email?: string
    password?: string
    captcha?: string
  }

  const errors: ErrorsType = {}

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  return errors
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

const Login: React.FC = () => {
  const isAuth = useSelector(getIsAuth)
  const captchaURL = useSelector(getCaptchaURL)
  const userID = useSelector(getAuthorizedUserID)
  const dispatch = useDispatch()

  const onSubmit = (values: LoginFormValuesType) => {
    dispatch(
      loginThunk(
        values.email,
        values.password,
        values.rememberMe,
        values.captcha
      )
    )
  }

  if (isAuth) {
    return <Redirect to={`/profile/${userID}`} />
  }

  return (
    <div className={s.wrap}>
      <div className={s.body}>
        <h1>Log in</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
      </div>
    </div>
  )
}

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType
> = ({ handleSubmit, error, captchaURL }) => {
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)

  const handleEnterTestAccount = () => {
    const email = 'free@samuraijs.com'
    const password = 'free'

    dispatch(loginThunk(email, password, false, null))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={s.loginBlockSubstrate}>
          <div className={s.loginBlock}>
            <div className={s.row}>
              <Field
                component={RenderTextField}
                name='email'
                label='Email:'
                type='email'
                fullWidth
              />
            </div>
            <div className={s.row}>
              <Field
                component={RenderTextField}
                name='password'
                label='Password:'
                type='password'
                fullWidth
              />
            </div>
            <div className={cn(s.row, s.rowCheckbox)}>
              <Field
                component={RenderCheckbox}
                name='rememberMe'
                label='Remember me'
              />
            </div>

            {captchaURL && <img src={captchaURL} alt='captcha' />}
            {captchaURL && (
              <Field component={RenderTextField} fullWidth name='captcha' />
            )}

            <div className={s.row}>
              <Button
                type='submit'
                variant='contained'
                color={theme === 'theme1' ? 'primary' : 'secondary'}
                fullWidth
                style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}
              >
                Log in
              </Button>

              {error && (
                <div className={s.formError}>
                  {error === 'You are not authorized' ? (
                    <>
                      <div>1. You are either not authorized</div>
                      <div>or</div>
                      <div>
                        2. Please, unblock third party cookies or show all
                        cookies (see browser settings)
                      </div>
                    </>
                  ) : (
                    error
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <p>or</p>
        <Button
          onClick={handleEnterTestAccount}
          variant='contained'
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          fullWidth
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            marginBottom: '15px',
          }}
        >
          Login to test account
        </Button>
      </form>
    </>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({
  form: 'loginForm',
  validate,
})(LoginForm)

export default Login
