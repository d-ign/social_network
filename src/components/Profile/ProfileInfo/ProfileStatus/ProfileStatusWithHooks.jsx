import React, { useEffect, useState } from 'react';
import s from './ProfileStatusWithHooks.module.css';

import { Input, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '../../../common/ElementCustom/InputCustomProfileStatus';
import { handleInputCount, handleFocusCount, handleBlurCount } from '../../../common/inputCount/inputCount';

const ProfileStatusWithHooks = (props) => {

  const classes = useStyles();

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  const activateEditMode = () => setEditMode(true);
  const onStatusChange = (e) => setStatus(e.currentTarget.value);
  const cancelEditMode = () => setEditMode(false);

  const saveStatus = () => {
    props.updateStatus(status);
    setEditMode(false);
  }

  const num300 = 300;

  return <div className={s.container}>
    {editMode && <div className={s.wrap}>
      <Input
        name='status'
        value={status}
        placeholder={'Your status...'}
        autoFocus
        inputProps={{ maxLength: 300 }}
        className={classes.inputProfileStatus}
        multiline={true}
        fullWidth={true}
        onInput={handleInputCount.bind(null, num300)}
        onFocus={handleFocusCount}
        onBlur={handleBlurCount}
        onChange={onStatusChange}
      />

      <div className={s.buttons}>
        <div className={s.buttonWrap}>
          <Button
            onClick={saveStatus}
            variant="contained"
            color="primary"
            style={{ color: '#fff', margin: 10, width: '100%' }}
            startIcon={<SaveIcon />}
          >Save</Button>
        </div>
        <div className={s.buttonWrap}>
          <Button
            onClick={cancelEditMode}
            variant="outlined"
            style={{ margin: 10, width: '100%' }}
            startIcon={<CloseIcon />}
          >Cancel</Button>
        </div>

        <span id='statusWrapCount'>
          <span id='statusCount'></span> of 300
        </span>
      </div>
    </div>
    }

    {props.isOwner && !editMode && <div className={s.status} onClick={activateEditMode}>
      {props.status ||
        <span className={s.statusEmpty}>
          Your status is empty
        </span>
      }
    </div>
    }

    {!props.isOwner && props.status && <div className={s.statusNotMy}>
      {props.status}
    </div>
    }
  </div>
}

export default ProfileStatusWithHooks;