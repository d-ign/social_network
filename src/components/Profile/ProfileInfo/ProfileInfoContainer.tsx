import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { submit } from 'redux-form'

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import s from './ProfileInfoContainer.module.scss'

import Avatar from '../../common/Avatar/Avatar'
import Preloader from '../../common/Preloader/Preloader'
import ProfilePlug from './ProfilePlug/ProfilePlug'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileData from './ProfileData/ProfileData'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ProfileInputChangeAvatar from './ProfileInputChangeAvatar/ProfileInputChangeAvatar'

import { getTheme } from '../../../redux/selectors/app-selectors'
import {
  getEditModeProfile,
  getErrorProfileContacts,
  getProfile,
  getShowSuccessSave,
} from '../../../redux/selectors/profile-selectors'
import {
  actions,
  savePhotoThunk,
  saveProfileThunk,
} from '../../../redux/reducers/profile-reducer'

import { ProfileType } from '../../../types/types'

// when going to the profile page, scroll up to the name
function ScrollToTopOnMount() {
  useEffect(() => {
    const fullName = document.getElementById('scrollToTopOnMount')
    fullName?.scrollIntoView(false)
  }, [])
  return null
}

type PropsType = {
  isOwner: boolean
}

const ProfileInfoContainer: React.FC<PropsType> = ({ isOwner }) => {
  const stylesSaveAndCancelButton: React.CSSProperties = {
    fontSize: 12,
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
    margin: 10,
  }

  const stylesEditButton: React.CSSProperties = {
    fontSize: 12,
    marginTop: 20,
  }

  // for ProfileInfoDataForm
  const errorProfileContacts = useSelector(getErrorProfileContacts)

  const theme = useSelector(getTheme)
  const profile = useSelector(getProfile)
  const showSuccessSave = useSelector(getShowSuccessSave)
  const isEditModeProfile = useSelector(getEditModeProfile)
  const dispatch = useDispatch()

  const [isEditInputProfileForm, setIsEditInputProfileForm] = useState(false)

  const onSubmitProfile = (values: ProfileType) => {
    dispatch(saveProfileThunk(values))
  }

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhotoThunk(e.target.files[0]))
    }
  }

  const handleEditProfile = () => {
    dispatch(actions.setEditModeProfile(true))
  }

  const handleSaveProfile = () => {
    setIsEditInputProfileForm(false)
    dispatch(submit('editProfile'))
  }

  const handleCancelProfile = () => {
    setIsEditInputProfileForm(false)
    dispatch(actions.setEditModeProfile(false))
  }

  if (!profile) {
    return (
      <>
        <Preloader display='default' />
        <ProfilePlug isOwner={isOwner} />
      </>
    )
  }

  return (
    <section className={s.container}>
      <h1 className={s.visuallyHidden}>Profile information</h1>
      <div className={s.columnLeft}>
        <div className={s.avatarWrap}>
          <Avatar photo={profile.photos.large} size='extra-large' id={null} />
          <ProfileInputChangeAvatar
            isOwner={isOwner}
            isEditModeProfile={isEditModeProfile}
            handleChangeAvatar={handleChangeAvatar}
          />
        </div>

        {isOwner && !isEditModeProfile && (
          <Button
            onClick={handleEditProfile}
            variant='outlined'
            style={stylesEditButton}
            startIcon={<EditIcon style={{ fontSize: 16 }} />}
          >
            Edit profile
          </Button>
        )}

        {isEditModeProfile && (
          <div className={s.buttonsSaveAndCancelProfile}>
            <Button
              onClick={handleSaveProfile}
              disabled={!isEditInputProfileForm}
              variant='contained'
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              fullWidth
              style={stylesSaveAndCancelButton}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            <Button
              onClick={handleCancelProfile}
              variant='outlined'
              fullWidth
              style={stylesSaveAndCancelButton}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </div>
        )}

        {isEditModeProfile && showSuccessSave && (
          <ShowSuccessSavePortal>
            <div className={s.successSave}>{showSuccessSave}</div>
          </ShowSuccessSavePortal>
        )}
      </div>

      <div className={s.columnRight}>
        {!isEditModeProfile && (
          <div id='scrollToTopOnMount' className={s.fullName}>
            {profile.fullName}
          </div>
        )}

        {!isEditModeProfile && <ProfileStatus isOwner={isOwner} />}

        {isEditModeProfile ? (
          <ProfileDataForm
            initialValues={profile}
            onSubmit={onSubmitProfile}
            errorProfileContacts={errorProfileContacts}
            setIsEditInputProfileForm={setIsEditInputProfileForm}
          />
        ) : (
          <ProfileData profile={profile} />
        )}
      </div>

      {/* when you go to the profile page, the scroll will be reset */}
      <ScrollToTopOnMount />
    </section>
  )
}

const ShowSuccessSavePortal = ({ children }: { children: React.ReactNode }) => {
  const el: HTMLDivElement = document.createElement('div')
  document.body.append(el)

  return createPortal(children, el)
}

export default ProfileInfoContainer
