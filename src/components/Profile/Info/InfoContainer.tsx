import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { getErrorProfileContacts, getProfile, getShowSuccessSave } from '../../../redux/selectors/profile-selectors';
import { savePhotoThunk, saveProfileThunk } from '../../../redux/reducers/profile-reducer';
import { ProfileType } from '../../../types/types';

import Preloader from '../../common/Preloader/Preloader';
import Status from './Status/Status';
import Avatar from '../../common/Avatar/Avatar';
import InfoDataForm from './InfoDataForm/InfoDataForm';
import InfoData from './InfoData/InfoData';

import s from './InfoContainer.module.css';
import camera from '../../../img/icons/camera.svg';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

// при переходе на старницу профиля скрол обнулится
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

type OwnPropsType = {
  isOwner: boolean
}

const ProfileInfo: React.FC<{} & {} & OwnPropsType> = ({ isOwner }) => {

  const stylesSaveAndCancelButton = {
    fontSize: 12,
    color: '#fff',
    margin: 10
  }
  const stylesEditButton = {
    fontSize: 12,
    marginTop: 20
  }

  const [editModeProfile, setEditModeProfile] = useState(false);

  // for InfoDataForm
  const errorProfileContacts = useSelector(getErrorProfileContacts)

  const profile = useSelector(getProfile)
  const showSuccessSave = useSelector(getShowSuccessSave)
  const dispatch = useDispatch()

  const onSubmit = (values: ProfileType) => {
    dispatch(saveProfileThunk(values))
  }

  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhotoThunk(e.target.files[0]))
    }
  }

  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={s.containerMain}>

      {/* при переходе на старницу профиля скрол обнулится */}
      <ScrollToTopOnMount />

      <div className={s.columnLeft}>
        <Avatar photo={profile.photos.large} size='large'>
          {isOwner && !editModeProfile &&
            <div className={s.camera}>
              <label htmlFor="file_out">
                <div className={s.wrapImg}>
                  <img src={camera} alt="icon" />
                </div>
              </label>
              <input
                id="file_out"
                className={s.editPhotoInput}
                type="file"
                onChange={onMainPhotoSelected} />
            </div>
          }
        </Avatar>

        {isOwner && !editModeProfile
          && <Button
            onClick={() => setEditModeProfile(true)}
            variant="outlined"
            style={stylesEditButton}
            startIcon={<EditIcon style={{ fontSize: 16 }} />}
          >Edit profile</Button>
        }

        {editModeProfile && <div className={s.buttonsSaveAndCancelProfile}>
          <Button
            onClick={() => dispatch(submit('editProfile'))}
            variant="contained"
            color="primary"
            fullWidth={true}
            style={stylesSaveAndCancelButton}
            startIcon={<SaveIcon />}
          >Save</Button>
          <Button
            onClick={() => setEditModeProfile(false)}
            variant="outlined"
            fullWidth={true}
            style={stylesSaveAndCancelButton}
            startIcon={<CloseIcon />}
          >Cancel</Button>
        </div>}

        {editModeProfile && showSuccessSave &&
          <div className={s.successSave}>
            {showSuccessSave}
          </div>
        }
      </div>


      <div className={s.columnRight}>

        {!editModeProfile && <div className={s.fullName}>{profile.fullName}</div>}

        {!editModeProfile &&
          <Status
            isOwner={isOwner} />
        }

        {editModeProfile
          ? <InfoDataForm
            initialValues={profile}
            errorProfileContacts={errorProfileContacts}
            onSubmit={onSubmit}
          />
          : <InfoData profile={profile} />}
      </div>
    </div>
  )
}

const InfoContainer = ProfileInfo
export default InfoContainer