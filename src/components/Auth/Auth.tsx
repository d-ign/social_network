import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import cn from 'classnames'
import Button from '@material-ui/core/Button'
import s from './Auth.module.scss'
import RenderTextField from '../common/RenderFormElement/RenderTextField'
import RenderCheckbox from '../common/RenderFormElement/RenderCheckbox'

import { useAppDispatch, useAppSelector } from '../../hooks/useApp'

import {
  getAuthorizedUserID,
  getCaptchaURL,
  getIsAuth,
} from '../../redux/selectors/auth-selectors'
import { getTheme } from '../../redux/selectors/app-selectors'
import { loginThunk } from '../../redux/reducers/auth-reducer'

import { LoginType } from '../../types/types'

const validate = (values: LoginType) => {
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
  handleEnterTestAccount: () => void
}

const Auth: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)
  const captchaURL = useAppSelector(getCaptchaURL)
  const userID = useAppSelector(getAuthorizedUserID)
  const dispatch = useAppDispatch()

  const onSubmit: (param: LoginType) => void = (param) => {
    // const { email, password, rememberMe, captcha } = param
    dispatch(loginThunk(param))
  }

  const handleEnterTestAccount = () => {
    const email = 'free@samuraijs.com'
    const password = 'free'
    dispatch(
      loginThunk({
        email,
        password,
        rememberMe: false,
        captcha: null,
      })
    )
  }

  if (isAuth) {
    return <Redirect to={`/profile/${userID}`} />
  }

  return (
    <main className={s.container}>
      <div className={s.body}>
        <h1>Log in</h1>
        <LoginReduxForm
          onSubmit={onSubmit}
          captchaURL={captchaURL}
          handleEnterTestAccount={handleEnterTestAccount}
        />
      </div>
    </main>
  )
}

const LoginForm: React.FC<
  InjectedFormProps<LoginType, OwnPropsType> & OwnPropsType
> = ({ handleSubmit, handleEnterTestAccount, error, captchaURL }) => {
  const stylesLoginButton: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
  }

  const stylesTestLoginButton: React.CSSProperties = {
    marginBottom: '15px',
    ...stylesLoginButton,
  }

  const theme = useAppSelector(getTheme)

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.loginBlockSubstrate}>
        <div className={s.loginBlock}>
          <div className={s.wrapElementForm}>
            <Field
              component={RenderTextField}
              autoComplete='username'
              name='email'
              label='Email:'
              type='email'
              fullWidth
            />
          </div>
          <div className={s.wrapElementForm}>
            <Field
              component={RenderTextField}
              autoComplete='current-password'
              name='password'
              label='Password:'
              type='password'
              fullWidth
            />
          </div>
          <div className={cn(s.wrapElementForm, s.wrapCheckbox)}>
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

          <div className={s.wrapElementForm}>
            <Button
              type='submit'
              variant='contained'
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              fullWidth
              style={stylesLoginButton}
            >
              Log in
            </Button>

            {error && (
              <article className={s.error}>
                {error === 'You are not authorized' ? (
                  <>
                    <p>1. You are either not authorized</p>
                    <p>or</p>
                    <p>
                      2. Please, unblock third party cookies or show all cookies
                      or add an exception for <br />
                      <u>ignatov-ru.github.io</u>
                      <br /> to resolve (see browser settings)
                    </p>
                  </>
                ) : (
                  error
                )}
              </article>
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
        style={stylesTestLoginButton}
      >
        Login to test account
      </Button>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginType, OwnPropsType>({
  form: 'loginForm',
  validate,
})(LoginForm)

export default Auth
