import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus';
import s from './ProfileInfo.module.css';
import unknown from '../../../img/no_photo.png';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhotoThunk(e.target.files[0])
    }
  }

  return (
    <div className={`${s.pageInfo__data} ${s.dataRow}`}>
      <img src={props.profile.photos.large || unknown} alt="avatar" />
      {props.isOwner && <input onChange={onMainPhotoSelected} type='file'/>}

      <ProfileStatusWithHooks
        status={props.status}
        updateStatus={props.updateStatus} />

      <div className={s.about}>
        <p>{props.profile.aboutMe}</p>
        <a href={props.profile.contacts.facebook}>facebook</a>
        <a href={props.profile.contacts.website}>website</a>
        <a href={props.profile.contacts.vk}>vk</a>
        <a href={props.profile.contacts.twitter}>twitter</a>
        <a href={props.profile.contacts.instagram}>instagram</a>
        <a href={props.profile.contacts.youtube}>youtube</a>
        <a href={props.profile.contacts.github}>github</a>
      </div>
    </div>
  )
}

export default ProfileInfo;