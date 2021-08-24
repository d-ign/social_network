import React from 'react'
import { ProfileType, СontactsType } from '../../../../types/types'
import s from './ProfileData.module.scss'

type PropsType = {
  profile: ProfileType
}

const ProfileData: React.FC<PropsType> = ({ profile }) => (
  <div className={s.containerForm}>
    <div className={s.wrap}>
      {profile.aboutMe && (
        <div className={s.aboutMe}>
          <div className={s.title}>About me:</div>
          <div className={s.text}>{profile.aboutMe}</div>
        </div>
      )}
    </div>

    <div className={s.wrap}>
      <div className={s.job}>
        <div className={s.title}>Job search:</div>
        {profile.lookingForAJob ? (
          <div className={s.text}>Now looking for a job!</div>
        ) : (
          <div className={s.text}>I&#39;m not looking for a job</div>
        )}
      </div>
    </div>

    <div className={s.wrap}>
      {profile.lookingForAJobDescription && (
        <div className={s.job}>
          <div className={s.title}>Professional skills:</div>
          <div className={s.text}>{profile.lookingForAJobDescription}</div>
        </div>
      )}
    </div>

    <div className={s.wrap}>
      {Object.values(profile.contacts).some((el) => el && el !== '') && (
        <div className={s.contacts}>
          <div className={s.title}>My contacts</div>
          {Object.keys(profile.contacts).map((key) => (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof СontactsType]}
            />
          ))}
        </div>
      )}
    </div>
  </div>
)

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactPropsType> = React.memo(
  ({ contactTitle, contactValue }) => (
    <>
      {contactValue && (
        <div className={s.contact}>
          <span className={s.contactTitle}>{contactTitle}:</span>
          <div className={s.contactTextWrap}>
            <a className={s.contactText} href={contactValue}>
              {contactValue.replace(/(?:https?):\/\/([^/\s]+)[^\s]*/gi, '$1')}
            </a>
          </div>
        </div>
      )}
    </>
  )
)

export default ProfileData
