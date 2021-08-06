import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import { getStatusSelector } from '../../../../redux/selectors/profile-selectors'
import { updateStatus } from '../../../../redux/reducers/profile-reducer'

import {
  handleInputCount,
  handleFocusCount,
  handleBlurCount,
} from '../../../common/inputCount/inputCount.js'

import s from './Status.module.scss'
import useStyles from './stylesCustomMaterialUI.jsx'

type PropsType = {
  isOwner: boolean
}

const Status: React.FC<PropsType> = (props) => {
  const { isOwner } = props
  const classes = useStyles()

  const stylesSaveAndButton = {
    color: '#fff',
    margin: 10,
    width: '100%',
  }

  const status = useSelector(getStatusSelector)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [statusLocal, setStatusLocal] = useState(status)

  useEffect(() => {
    setStatusLocal(status)
  }, [status])

  const activateEditMode = () => setEditMode(true)
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStatusLocal(e.currentTarget.value)
  const cancelEditMode = () => setEditMode(false)

  const saveStatus = () => {
    dispatch(updateStatus(statusLocal))
    setEditMode(false)
  }

  const num300 = 300

  return (
    <div className={s.container}>
      {editMode && (
        <div className={s.wrap}>
          <Input
            name='status'
            value={statusLocal}
            placeholder='Your status...'
            autoFocus
            inputProps={{ maxLength: 300 }}
            className={classes.stylesStatus}
            multiline
            fullWidth
            onInput={handleInputCount.bind(null, num300)}
            onFocus={handleFocusCount}
            onBlur={handleBlurCount}
            onChange={onStatusChange}
          />

          <div className={s.buttons}>
            <div className={s.buttonWrap}>
              <Button
                onClick={saveStatus}
                variant='contained'
                color='primary'
                style={stylesSaveAndButton}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </div>
            <div className={s.buttonWrap}>
              <Button
                onClick={cancelEditMode}
                variant='outlined'
                style={stylesSaveAndButton}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </div>

            <span id='statusWrapCount'>
              <span id='statusCount' /> of 300
            </span>
          </div>
        </div>
      )}

      {editMode && <div className={s.plug} />}

      {isOwner && !editMode && (
        <div aria-hidden='true' className={s.status} onClick={activateEditMode}>
          {status || <span className={s.noStatus}>Your status is empty</span>}
        </div>
      )}

      {!isOwner && status && <div className={s.statusNotMy}>{status}</div>}
    </div>
  )
}

export default Status
