import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { getAuthorizedUserID, getCaptchaURL, getIsAuth } from '../../redux/selectors/auth-selectors';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { loginThunk } from '../../redux/reducers/auth-reducer';

import s from './Login.module.css';
import cn from 'classnames';
import renderTextField from '../common/ElementCustom/renderTextField';
import renderCheckbox from '../common/ElementCustom/renderCheckbox';
import Button from '@material-ui/core/Button';

const validate = (values: LoginFormValuesType) => {

  type ErrorsType = {
    email?: string
    password?: string
    captcha?: string
  }

  const errors: ErrorsType = {}

  if (values.email
    && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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



const Login: React.FC = (props) => {

  const isAuth = useSelector(getIsAuth)
  const captchaURL = useSelector(getCaptchaURL)
  const userID = useSelector(getAuthorizedUserID)
  const dispatch = useDispatch()

  const onSubmit = (values: LoginFormValuesType) => {
    dispatch(loginThunk(
      values.email, values.password, values.rememberMe, values.captcha))
  }

  if (isAuth) {
    return <Redirect to={`/profile/${userID}`} />
  }

  return <div className={s.wrap}>
    <div className={s.body}>
      <h1>Log in</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaURL={captchaURL} />
    </div>
  </div>
}



const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({ handleSubmit, error, captchaURL }) => {

  const stylesLoginButton: any = {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }

  const dispatch = useDispatch()

  const onTestAccountSubmit = (email: string, password: string) => {
    dispatch(loginThunk(email, password, false, null))
  }

  return <>
    <form onSubmit={handleSubmit}>
      <div className={s.loginBlockSubstrate}>
      <div className={s.loginBlock}>
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
            fullWidth={true}
            style={stylesLoginButton}
          >Log in</Button>

          {error &&
            <div className={s.formError}>
              {error}
            </div>
          }
        </div>
      </div>
      </div>
      <p>or</p>
      <Button
        onClick={() => onTestAccountSubmit('free@samuraijs.com', 'free')}
        variant="contained"
        color="secondary"
        fullWidth={true}
        style={stylesLoginButton}
      >Login to test account
      </Button>
    </form>
  </>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({
  form: 'loginForm',
  validate,
})(LoginForm);

export default Login