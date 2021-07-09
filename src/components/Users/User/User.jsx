import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './User.module.css';
import unknown from './../../../img/no_photo.svg';

import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const User = (props) => {
  const { id, photo, name, status, followed, unfollow, follow, followingInProgress, authorizedUserID } = props;

  return <>
    <NavLink to={'/profile/' + id}
      style={{ textDecoration: 'none', display: 'block' }}>
      <div className={s.wrapAvatarNameAndStatus}>
        <div>
          <div className={s.avatar}>
            <img src={photo !== null ? photo : unknown} alt="avatar" />
          </div>
        </div>

        <div className={s.nameAndStatus}>
          {name && (name.length > 17)
            ? <div data-tooltip={name}>
              <div className={s.name}>{name}</div>
            </div>
            : <div className={s.name}>{name}</div>
          }
          {status && (status.length > 17)
            ? <div data-tooltip={status}>
              <div className={s.status}>{status}</div>
            </div>
            : <div className={s.status}>{status}</div>
          }
        </div>
      </div>
    </NavLink>

    {followed
      ? <div className={s.button}>
        <Button
          onClick={() => unfollow(id)}
          disabled={followingInProgress.some(id => id === id)}
          color="secondary"
          style={{ justifyContent: 'flex-end', alignItems: 'flex-start', flexBasis: '200px' }}
          startIcon={<RemoveIcon />}
        >Unfollow</Button>
      </div>

      : (id == authorizedUserID) ? <></>

        : <div className={s.button}>
          <Button
            onClick={() => follow(id)}
            disabled={followingInProgress.some(id => id === id)}
            color="primary"
            style={{ justifyContent: 'flex-end', alignItems: 'flex-start', flexBasis: '200px' }}
            startIcon={<AddIcon />}
          >Follow</Button>
        </div>
    }
  </>
}

export default User;