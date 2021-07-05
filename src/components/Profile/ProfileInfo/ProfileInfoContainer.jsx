import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';

import camera from '../../../img/icons/camera.svg';
import unknown from '../../../img/no_photo.png';
import s from './ProfileInfoContainer.module.css';

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

const ProfileInfo = ({ dispatch, ...props }) => {

  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
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
            {props.isOwner && !editMode &&
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

        {props.isOwner && !editMode
          && <Button
            onClick={() => setEditMode(true)}
            variant="outlined"
            style={{ fontSize: 12, marginTop: 10 }}
            startIcon={<EditIcon style={{ fontSize: 16 }} />}
          >Edit profile</Button>
        }

        {editMode && <div className={s.buttonsSaveAndCancelProfile}>
          <Button
            onClick={() => dispatch(submit('editProfile'))}
            variant="contained"
            color="primary"
            fullWidth={true}
            style={{ fontSize: 12, color: '#fff', margin: 10 }}
            startIcon={<SaveIcon />}
          >Save</Button>
          <Button
            onClick={() => setEditMode(false)}
            variant="outlined"
            fullWidth={true}
            style={{ fontSize: 12, color: '#fff', margin: 10 }}
            startIcon={<CloseIcon />}
          >Cancel</Button>
        </div>}

        {editMode && props.showSuccessSave &&
          <div className={s.successSave}>
            {props.showSuccessSave}
          </div>
        }
      </div>


      <div className={s.columnRight}>

        {!editMode && <div className={s.fullName}>{props.profile.fullName}</div>}

        {!editMode && <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus} />
        }

        {editMode
          ? <ProfileDataForm
            initialValues={props.profile}
            errorProfileContacts={props.errorProfileContacts}
            onSubmit={formData => props.saveProfileThunk(formData)}
          />
          : <ProfileData {...props} />}
      </div>
    </div>
  )
}

const ProfileInfoContainer = connect()(ProfileInfo);

export default ProfileInfoContainer;