import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import FieldWithCounter from '../../../common/FieldWithCounter/FieldWithCounter'
import RenderTextField from '../../../common/RenderFormElement/RenderTextField'
import RenderCheckbox from '../../../common/RenderFormElement/RenderCheckbox'
import s from './ProfileDataForm.module.scss'

import { ProfileType } from '../../../../types/types'

type OwnPropsType = {
  errorProfileContacts: string
  setIsEditInputProfileForm: (bool: boolean) => void
  initialValues: ProfileType
}

const Form: React.FC<
  InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType
> = (props) => {
  const {
    handleSubmit,
    initialValues,
    errorProfileContacts,
    setIsEditInputProfileForm,
  } = props

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.titleForm}>Edit profile</h1>

      <div className={s.wrap}>
        <FieldWithCounter
          renderContent={(handleInput, handleFocus, handleBlur) => (
            <Field
              component={RenderTextField}
              inputProps={{ maxLength: 100 }}
              label='Name:'
              name='fullName'
              placeholder='Your name'
              variant='filled'
              fullWidth
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          setIsEditInputProfileForm={setIsEditInputProfileForm}
          maxLength={100}
        />
      </div>

      <div className={s.wrap}>
        <FieldWithCounter
          renderContent={(handleInput, handleFocus, handleBlur) => (
            <Field
              component={RenderTextField}
              inputProps={{ maxLength: 1000 }}
              multiline
              label='About me:'
              name='aboutMe'
              placeholder='Write about yourself!'
              variant='filled'
              fullWidth
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          setIsEditInputProfileForm={setIsEditInputProfileForm}
          maxLength={1000}
        />
      </div>

      <div className={s.wrap}>
        <Field
          component={RenderCheckbox}
          onChange={() => {
            setIsEditInputProfileForm(true)
          }}
          name='lookingForAJob'
          label='Are you looking for a job?'
        />
      </div>

      <div className={s.wrap}>
        <FieldWithCounter
          renderContent={(handleInput, handleFocus, handleBlur) => (
            <Field
              component={RenderTextField}
              inputProps={{ maxLength: 1000 }}
              multiline
              label='Professional skills:'
              name='lookingForAJobDescription'
              placeholder='What you can do?'
              variant='filled'
              fullWidth
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          setIsEditInputProfileForm={setIsEditInputProfileForm}
          maxLength={1000}
        />
      </div>

      <div className={s.wrap}>
        <div className={s.titleAllContacts}>Contacts:</div>

        {errorProfileContacts ? (
          <div className={s.errorProfileContacts}>{errorProfileContacts}</div>
        ) : (
          <></>
        )}

        {Object.keys(initialValues.contacts).map((key) => (
          <div className={s.contact} key={key}>
            <div className={s.titleContact}>{key}:</div>

            <Field
              component={RenderTextField}
              onInput={() => setIsEditInputProfileForm(true)}
              name={`contacts.${key}`}
              placeholder='https://...'
              multiline
              fullWidth
            />
          </div>
        ))}
      </div>
    </form>
  )
}

const ProfileDataForm = reduxForm<ProfileType, OwnPropsType>({
  form: 'editProfile',
})(Form)

export default ProfileDataForm
