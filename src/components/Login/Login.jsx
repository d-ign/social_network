import React from 'react';
import s from './Login.module.css'
import { Field, reduxForm } from 'redux-form';
// redux-form предоставляет локальный state, где хранит временные данные во время ввода до отправки их на сервер (в глобальное состояние)
import { Element } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { loginThunk, logoutThunk } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';

const Login = (props) => {

  const onSubmit = (formData) => {
    props.loginThunk(
      formData.email, formData.password, formData.rememberMe, formData.captcha)
    // имя captcha должно соответствовать name в field и тому имени, которое ждет сервер
  }

  if (props.isAuth) {
    return <Redirect to={`/profile/${props.id}`} />
  }

  return <>
    <h1>Авторизация</h1>
    <LoginReduxForm
      onSubmit={onSubmit}
      logoutThunk={logoutThunk}
      captchaURL={props.captchaURL} />
  </>
}

const maxLength30 = maxLengthCreator(30);
const Input = Element("input");

// Field передаст через пропсы в input атрибуты
const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return <>
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className={s.row}>
          <label htmlFor='email'>Логин</label>
          <Field
            id='email'
            type="email"
            name='email'
            component={Input}
            validate={[required, maxLength30]} />
        </div>
        <div className={s.row}>
          <label htmlFor='password'>Пароль</label>
          <Field
            id='password'
            type="password"
            name='password'
            component={Input}
            validate={[required, maxLength30]} />
        </div>
        <div className={s.row}>
          <label htmlFor='save'>
            <Field
              id='save'
              type="checkbox"
              name='rememberMe'
              component={Input}
              validate={[]} />
            Запомнить меня
          </label>
        </div>

        {captchaURL && <img src={captchaURL} alt='captcha'/>}
        {captchaURL &&
          <Field
            type="text"
            name='captcha'
            component={Input}
            validate={[required]} />}

        <div className={s.row}>
          <button>Войти</button>
          {error && <span className={s.formError}>{error}</span>}
        </div>
      </div>
    </form>
  </>
}


const LoginReduxForm = reduxForm({
  form: 'loginForm' // form никак не связан с form в redux-store
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