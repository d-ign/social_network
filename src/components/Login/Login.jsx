import React from 'react';
import s from './Login.module.css'
import { Field, reduxForm } from 'redux-form';
import { Element } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { loginThunk, logoutThunk } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';

const Login = (props) => {

  const onSubmit = (formData) => {
    props.loginThunk(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {
    return <Redirect to={`/profile/${props.id}`} />
  }

  return <>
    <h1>Авторизация</h1>
    <LoginReduxForm onSubmit={onSubmit} logoutThunk={logoutThunk}/>
  </>
}

const maxLength30 = maxLengthCreator(30);
const Input = Element("input");

// Field передаст через пропсы в input атрибуты
const LoginForm = ({ handleSubmit, error }) => {
  return <>
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className={s.row}>
          <label for='email'>Логин</label>
          <Field
            id='email'
            type="email"
            name='email'
            component={Input}
            validate={[required, maxLength30]} />
        </div>
        <div className={s.row}>
          <label for='password'>Пароль</label>
          <Field
            id='password'
            type="password"
            name='password'
            component={Input}
            validate={[required, maxLength30]} />
        </div>
        <div className={s.row}>
          <label for='save'>
            <Field
              id='save'
              type="checkbox"
              name='rememberMe'
              component={Input}
              validate={[]} />
            Запомнить меня
          </label>
        </div>
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
  isAuth: state.auth.isAuth,
  id: state.auth.id,
});

export default connect(mapStateToProps, {
  loginThunk,
  logoutThunk
})(Login);