import React, { Dispatch, SetStateAction } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import FieldWithCounter from '../../../common/FieldWithCounter/FieldWithCounter'
import RenderTextField from '../../../common/RenderFormElement/RenderTextField'
import RenderCheckbox from '../../../common/RenderFormElement/RenderCheckbox'
import s from './ProfileDataForm.module.scss'

import { ProfileType } from '../../../../types/types'

type OwnPropsType = {
  initialValues: ProfileType
  errorProfileContacts: string
  setIsEditInputProfileForm: Dispatch<SetStateAction<boolean>>
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

  const handleEditInput = () => {
    setIsEditInputProfileForm(true)
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.titleForm}>Edit profile</h1>

      <FieldDataForm
        label='Name:'
        name='fullName'
        placeholder='Your name'
        maxLength={100}
        multiline='false'
        setIsEditInputProfileForm={setIsEditInputProfileForm}
      />

      <FieldDataForm
        label='About me:'
        name='aboutMe'
        placeholder='Write about yourself!'
        maxLength={1000}
        multiline='true'
        setIsEditInputProfileForm={setIsEditInputProfileForm}
      />

      <div className={s.block}>
        <Field
          component={RenderCheckbox}
          onChange={handleEditInput}
          name='lookingForAJob'
          label='Are you looking for a job?'
        />
      </div>

      <FieldDataForm
        label='Professional skills:'
        name='lookingForAJobDescription'
        placeholder='What you can do?'
        maxLength={1000}
        multiline='true'
        setIsEditInputProfileForm={setIsEditInputProfileForm}
      />

      <address className={s.block}>
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
              onInput={handleEditInput}
              name={`contacts.${key}`}
              placeholder='https://...'
              multiline
              fullWidth
            />
          </div>
        ))}
      </address>
    </form>
  )
}

type FieldDataFormPropsType = {
  label: string
  name: string
  placeholder: string
  maxLength: number
  multiline: 'true' | 'false'
  setIsEditInputProfileForm: Dispatch<SetStateAction<boolean>>
}

const FieldDataForm: React.FC<FieldDataFormPropsType> = (props) => {
  const {
    label,
    name,
    placeholder,
    maxLength,
    multiline,
    setIsEditInputProfileForm,
  } = props

  return (
    <div className={s.block}>
      <FieldWithCounter
        renderContent={(handleInput, handleFocus, handleBlur) => (
          <Field
            component={RenderTextField}
            label={label}
            name={name}
            placeholder={placeholder}
            inputProps={{ maxLength }}
            multiline={multiline === 'true'}
            fullWidth
            variant='filled'
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        maxLength={maxLength}
        setIsEditInputProfileForm={setIsEditInputProfileForm}
      />
    </div>
  )
}

const ProfileDataForm = reduxForm<ProfileType, OwnPropsType>({
  form: 'editProfile',
})(Form)

export default ProfileDataForm
