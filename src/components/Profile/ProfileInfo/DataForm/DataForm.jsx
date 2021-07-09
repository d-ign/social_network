import React from 'react';
import { Field, reduxForm } from 'redux-form';

import renderTextField from '../../../common/ElementCustom/renderTextField';
import renderCheckbox from '../../../common/ElementCustom/renderCheckbox';
import s from './DataForm.module.css';
import cn from 'classnames';

import { handleInputCount, handleFocusCount, handleBlurCount } from '../../../common/inputCount/inputCount';

const DataForm = (props) => {
  const { handleSubmit, initialValues, ...custom } = props;

  const num100 = 100;
  const num1000 = 1000;

  return <form onSubmit={handleSubmit} className={s.form}>

    <h1 className={s.titleForm}>Edit profile</h1>

    <div className={cn(s.wrap, s.wrapForCount)}>
      <Field
        component={renderTextField}
        name='fullName'
        label='Name:'
        placeholder='Your name'
        variant="filled"
        fullWidth={true}
        inputProps={{ maxLength: 100 }}
        onInput={handleInputCount.bind(null, num100)}
        onFocus={handleFocusCount}
        onBlur={handleBlurCount}
      />
      <span id='fullNameWrapCount' className={s.countStyle}>
        <span id='fullNameCount'></span> of 100
      </span>
    </div>

    <div className={cn(s.wrap, s.wrapForCount)}>
      <Field
        component={renderTextField}
        name='aboutMe'
        label='About me:'
        placeholder='Write about yourself!'
        multiline={true}
        fullWidth={true}
        variant="filled"
        inputProps={{ maxLength: 1000 }}
        onInput={handleInputCount.bind(null, num1000)}
        onFocus={handleFocusCount}
        onBlur={handleBlurCount}
      />
      <span id='aboutMeWrapCount' className={s.countStyle}>
        <span id='aboutMeCount'></span> of 1000
      </span>
    </div>

    <div className={s.wrap}>
      <Field
        component={renderCheckbox}
        name='lookingForAJob'
        label='Are you looking for a job?'
      />
    </div>

    <div className={cn(s.wrap, s.wrapForCount)}>
      <Field
        component={renderTextField}
        name='lookingForAJobDescription'
        label='Professional skills:'
        placeholder='What you can do?'
        multiline={true}
        fullWidth={true}
        variant="filled"
        inputProps={{ maxLength: 1000 }}
        onInput={handleInputCount.bind(null, num1000)}
        onFocus={handleFocusCount}
        onBlur={handleBlurCount}
      />
      <span id='lookingForAJobDescriptionWrapCount' className={s.countStyle}>
        <span id='lookingForAJobDescriptionCount'></span> of 1000
      </span>
    </div>

    <div className={s.wrap}>
      <div className={s.titleAllContacts}>Contacts:</div>

      <div className={s.errorProfileContacts}>
        {custom.errorProfileContacts}
      </div>

      {Object.keys(initialValues.contacts).map(key => {
        return <div className={s.contacts} key={key}>
          <div className={s.titleContact}>{key}:</div>
          <Field
            component={renderTextField}
            name={'contacts.' + key}
          />
        </div>
      })}
    </div>
  </form>
}

export default reduxForm({
  form: 'editProfile',
})(DataForm);
