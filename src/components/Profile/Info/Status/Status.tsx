import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import s from './Status.module.scss'
import useStyles from './stylesCustomMaterialUI.jsx'
import { getTheme } from '../../../../redux/selectors/app-selectors'

import { getStatusSelector } from '../../../../redux/selectors/profile-selectors'
import { updateStatus } from '../../../../redux/reducers/profile-reducer'
import {
  handleInputCount,
  handleFocusCount,
  handleBlurCount,
} from '../../../common/inputCount/inputCount.js'

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
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [isEditInputStatusForm, setIsEditInputStatusForm] = useState(false)
  const [statusLocal, setStatusLocal] = useState(status)
  const num300 = 300

  useEffect(() => {
    setStatusLocal(status)
  }, [status])

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditInputStatusForm(true)
    setStatusLocal(e.currentTarget.value)
  }

  const saveStatus = () => {
    dispatch(updateStatus(statusLocal))
    setIsEditInputStatusForm(false)
    setEditMode(false)
  }

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function handleClickOutside(event: MouseEvent | any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditMode(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const statusRef = useRef(null)
  useOutsideAlerter(statusRef)

  return (
    <div ref={statusRef} className={s.container}>
      {editMode && (
        <div className={s.wrap}>
          <Input
            name='status'
            value={statusLocal}
            placeholder='Your status...'
            autoFocus
            inputProps={{ maxLength: 300 }}
            className={classes.stylesStatus}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
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
                disabled={!isEditInputStatusForm}
                variant='contained'
                color={theme === 'theme1' ? 'primary' : 'secondary'}
                style={stylesSaveAndButton}
                startIcon={<SaveIcon />}
              >
                Save
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
        <div
          aria-hidden='true'
          className={s.status}
          onClick={() => setEditMode(true)}
        >
          {status || <span className={s.noStatus}>Your status is empty</span>}
        </div>
      )}

      {!isOwner && status && <div className={s.statusNotMy}>{status}</div>}
    </div>
  )
}

export default Status
