import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submit } from 'redux-form'

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import s from './InfoContainer.module.scss'
import camera from '../../../img/icons/camera.svg'

import Preloader from '../../common/Preloader/Preloader'
import Status from './Status/Status'
import Avatar from '../../common/Avatar/Avatar'
import InfoDataForm from './InfoDataForm/InfoDataForm'
import InfoData from './InfoData/InfoData'

import { getTheme } from '../../../redux/selectors/app-selectors'
import {
  getEditInputProfileForm,
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

// при переходе на страницу профиля скрол прокрутится вверх до имени
function ScrollToTopOnMount() {
  useEffect(() => {
    const fullName = document.getElementById('scrollToTopOnMount')
    fullName?.scrollIntoView(false)
  }, [])
  return null
}

type OwnPropsType = {
  isOwner: boolean
}

const ProfileInfo: React.FC<OwnPropsType> = ({ isOwner }) => {
  const stylesSaveAndCancelButton = {
    fontSize: 12,
    color: '#fff',
    margin: 10,
  }
  const stylesEditButton = {
    fontSize: 12,
    marginTop: 20,
  }

  // for InfoDataForm
  const errorProfileContacts = useSelector(getErrorProfileContacts)

  const theme = useSelector(getTheme)
  const profile = useSelector(getProfile)
  const showSuccessSave = useSelector(getShowSuccessSave)
  const isEditModeProfile = useSelector(getEditModeProfile)
  const isEditInputProfileForm = useSelector(getEditInputProfileForm)
  const dispatch = useDispatch()

  const onSubmit = (values: ProfileType) => {
    dispatch(saveProfileThunk(values))
  }

  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhotoThunk(e.target.files[0]))
    }
  }

  const handleEditInputProfileForm = (bool: boolean) => {
    dispatch(actions.setEditInputProfileForm(bool))
  }

  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={s.containerMain}>
      <div className={s.columnLeft}>
        <Avatar photo={profile.photos.large} size='large'>
          {isOwner && !isEditModeProfile && (
            <div className={s.camera}>
              <label htmlFor='file_out'>
                <div className={s.wrapImg}>
                  <img src={camera} alt='icon' />
                </div>
                <input
                  id='file_out'
                  hidden
                  type='file'
                  onChange={onMainPhotoSelected}
                />
              </label>
            </div>
          )}
        </Avatar>

        {isOwner && !isEditModeProfile && (
          <Button
            onClick={() => dispatch(actions.setEditModeProfile(true))}
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
              onClick={() => {
                handleEditInputProfileForm(false)
                dispatch(submit('editProfile'))
              }}
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
              onClick={() => {
                handleEditInputProfileForm(false)
                dispatch(actions.setEditModeProfile(false))
              }}
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
          <div className={s.successSave}>{showSuccessSave}</div>
        )}
      </div>

      <div className={s.columnRight}>
        {!isEditModeProfile && (
          <div id='scrollToTopOnMount' className={s.fullName}>
            {profile.fullName}
          </div>
        )}

        {!isEditModeProfile && <Status isOwner={isOwner} />}

        {isEditModeProfile ? (
          <InfoDataForm
            initialValues={profile}
            errorProfileContacts={errorProfileContacts}
            onSubmit={onSubmit}
            handleEditInputProfileForm={handleEditInputProfileForm}
          />
        ) : (
          <InfoData profile={profile} />
        )}
      </div>
      {/* при переходе на старницу профиля скрол обнулится */}
      <ScrollToTopOnMount />
    </div>
  )
}

const InfoContainer = ProfileInfo
export default InfoContainer
