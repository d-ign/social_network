import React from 'react';
import s from './ProfileData.module.css';

const ProfileData = ({ profile }) => {
  return <div className={s.containerForm}>

    <div className={s.wrap}>
      {profile.aboutMe && <div className={s.aboutMe}>
        <div className={s.title}>About me:</div>
        <div className={s.text}>{profile.aboutMe}</div>
      </div>
      }
    </div>

    <div className={s.wrap}>
      <div className={s.job}>
        <div className={s.title}>Job search:</div>
        {profile.lookingForAJob
          ? <div className={s.text}>Now looking for a job!</div>
          : <div className={s.text}>I'm not looking for a job</div>}
      </div>
    </div>

    <div className={s.wrap}>
      {profile.lookingForAJobDescription && <div className={s.job}>
        <div className={s.title}>Professional skills:</div>
        <div className={s.text}>{profile.lookingForAJobDescription}</div>
      </div>
      }
    </div>

    <div className={s.wrap}>
      {Object.values(profile.contacts).some(val => val && val !== '')
        && <div className={s.contacts}>
          <div className={s.title}>My contacts</div>
          {Object.keys(profile.contacts).map(key => {
            return <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]} />
          })}
        </div>
      }
    </div>
  </div >
}

const Contact = ({ contactTitle, contactValue }) => {
  return (<>
    {contactValue
      && <div className={s.contact}>
        <span className={s.contactTitle}>{contactTitle}:</span>
        <a className={s.contactText} href={contactValue}>{contactValue}</a>
      </div>}
  </>
  )
}

export default ProfileData;