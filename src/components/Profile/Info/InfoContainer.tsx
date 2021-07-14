import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import Preloader from '../../common/Preloader/Preloader';
import Status from './Status/Status';
import InfoDataForm from './InfoDataForm/InfoDataForm';
import InfoData from './InfoData/InfoData';

import camera from '../../../img/icons/camera.svg';
import unknown from '../../../img/no_photo.svg';
import s from './InfoContainer.module.css';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { ProfileType } from '../../../types/types';

// при переходе на старницу профиля скрол обнулится
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

type MapStatePropsType = {
  profile: ProfileType | null
  status: string
  showSuccessSave: string
  errorProfileContacts: string
}

type MapDispatchPropsType = {
  dispatch: any
  updateStatus: (status: string) => void
  savePhotoThunk: (file: File) => void
  saveProfileThunk: (profile: ProfileType) => void
}

type OwnPropsType = {
  isOwner: boolean
}

const ProfileInfo: React.FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = ({ dispatch, ...props }) => {

  const [editModeProfile, seteditModeProfile] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  const onSubmit = (values: ProfileType) => {
    props.saveProfileThunk(values)
  }

  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhotoThunk(e.target.files[0])
    }
  }

  return (
    <div className={s.containerMain}>

      {/* при переходе на старницу профиля скрол обнулится */}
      <ScrollToTopOnMount />

      <div className={s.columnLeft}>
        <div className={s.avatarWrap}>
          <div className={s.avatar}>
            <img src={props.profile.photos.large || unknown} alt="avatar" />
            {props.isOwner && !editModeProfile &&
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
          </div>
        </div>

        {props.isOwner && !editModeProfile
          && <Button
            onClick={() => seteditModeProfile(true)}
            variant="outlined"
            style={{ fontSize: 12, marginTop: 10 }}
            startIcon={<EditIcon style={{ fontSize: 16 }} />}
          >Edit profile</Button>
        }

        {editModeProfile && <div className={s.buttonsSaveAndCancelProfile}>
          <Button
            onClick={() => dispatch(submit('editProfile'))}
            variant="contained"
            color="primary"
            fullWidth={true}
            style={{ fontSize: 12, color: '#fff', margin: 10 }}
            startIcon={<SaveIcon />}
          >Save</Button>
          <Button
            onClick={() => seteditModeProfile(false)}
            variant="outlined"
            fullWidth={true}
            style={{ fontSize: 12, color: '#fff', margin: 10 }}
            startIcon={<CloseIcon />}
          >Cancel</Button>
        </div>}

        {editModeProfile && props.showSuccessSave &&
          <div className={s.successSave}>
            {props.showSuccessSave}
          </div>
        }
      </div>


      <div className={s.columnRight}>

        {!editModeProfile && <div className={s.fullName}>{props.profile.fullName}</div>}

        {!editModeProfile && <Status
          status={props.status}
          updateStatus={props.updateStatus}
          isOwner={props.isOwner} />
        }

        {editModeProfile
          ? <InfoDataForm
            initialValues={props.profile}
            errorProfileContacts={props.errorProfileContacts}
            onSubmit={onSubmit}
          />
          : <InfoData profile={props.profile} />}
      </div>
    </div>
  )
}

const InfoContainer = connect()(ProfileInfo);

export default InfoContainer;

// MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType