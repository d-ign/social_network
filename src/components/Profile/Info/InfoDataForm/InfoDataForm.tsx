import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import FieldWithCounter from '../../../common/FieldWithCounter/FieldWithCounter'
import renderTextField from '../../../common/ElementCustom/renderTextField'
import renderCheckbox from '../../../common/ElementCustom/renderCheckbox'
import s from './InfoDataForm.module.scss'

import { ProfileType } from '../../../../types/types'

type OwnPropsType = {
  errorProfileContacts: string
  handleEditInputProfileForm: (bool: boolean) => void
  initialValues: ProfileType
}

const DataForm: React.FC<
  InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType
> = (props) => {
  const {
    handleSubmit,
    initialValues,
    errorProfileContacts,
    handleEditInputProfileForm,
  } = props

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.titleForm}>Edit profile</h1>

      <div className={s.wrap}>
        <FieldWithCounter
          label='Name:'
          name='fullName'
          placeholder='Your name'
          maxLength={100}
          handleOnEditInputForm={handleEditInputProfileForm}
        />
      </div>

      <div className={s.wrap}>
        <FieldWithCounter
          multiline
          label='About me:'
          name='aboutMe'
          placeholder='Write about yourself!'
          maxLength={1000}
          handleOnEditInputForm={handleEditInputProfileForm}
        />
      </div>

      <div className={s.wrap}>
        <Field
          component={renderCheckbox}
          onChange={() => {
            handleEditInputProfileForm(true)
          }}
          name='lookingForAJob'
          label='Are you looking for a job?'
        />
      </div>

      <div className={s.wrap}>
        <FieldWithCounter
          multiline
          label='Professional skills:'
          name='lookingForAJobDescription'
          placeholder='What you can do?'
          maxLength={1000}
          handleOnEditInputForm={handleEditInputProfileForm}
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
              component={renderTextField}
              onInput={() => handleEditInputProfileForm(true)}
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

const InfoDataForm = reduxForm<ProfileType, OwnPropsType>({
  form: 'editProfile',
})(DataForm)

export default InfoDataForm
