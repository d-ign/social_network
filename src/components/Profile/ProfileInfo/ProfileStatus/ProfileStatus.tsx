import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import cn from 'classnames'
import s from './ProfileStatus.module.scss'
import stylesField from '../../../common/FieldWithCounter/FieldWithCounter.module.scss'
import useStyles from './stylesCustomMaterialUI'
import { getTheme } from '../../../../redux/selectors/app-selectors'

import useOutsideAlerter from '../../../../hooks/useOutsideAlerter'
import { getStatus } from '../../../../redux/selectors/profile-selectors'
import { updateStatus } from '../../../../redux/reducers/profile-reducer'

type PropsType = {
  isOwner: boolean
}

const ProfileStatus = ({ isOwner }: PropsType) => {
  const classes = useStyles()

  const stylesSaveAndButton: React.CSSProperties = {
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
    boxShadow: '2px 2px 5px var(--color-darkBlueTransparent)',
    margin: 10,
    width: '100%',
  }

  const status = useSelector(getStatus)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [isEditInputStatusForm, setIsEditInputStatusForm] = useState(false)
  const [statusLocal, setStatusLocal] = useState(status)

  const [isHiddenCounter, setIsHiddenCounter] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setStatusLocal(status)
  }, [status])

  const handleFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    setCount(e.target.value.length)
    setIsHiddenCounter(false)
  }

  const handleBlurInput = () => {
    setIsHiddenCounter(true)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value.length)
    setIsEditInputStatusForm(true)
    setStatusLocal(e.currentTarget.value)
  }

  const handleSaveStatus = () => {
    dispatch(updateStatus(statusLocal))
    setIsEditInputStatusForm(false)
    setEditMode(false)
  }

  const statusRef = useRef<HTMLDivElement | null>(null)
  useOutsideAlerter(statusRef, setEditMode)

  return (
    <div ref={statusRef} className={s.container} title='Change status'>
      {editMode && (
        <div className={s.statusEditMode}>
          <TextField
            autoFocus
            multiline
            fullWidth
            name='newStatusText'
            placeholder='Your status...'
            inputProps={{ maxLength: 300 }}
            className={classes.status}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            value={statusLocal}
            onChange={handleChangeInput}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />

          <div className={s.buttonAndCounter}>
            <div className={s.buttonWrap}>
              <Button
                onClick={handleSaveStatus}
                disabled={!isEditInputStatusForm}
                variant='contained'
                color={theme === 'theme1' ? 'primary' : 'secondary'}
                style={stylesSaveAndButton}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </div>

            <span
              className={cn(
                stylesField.count,
                { [stylesField.countHidden]: isHiddenCounter },
                { [stylesField.countYellow]: count >= 290 },
                { [stylesField.countRed]: count === 300 }
              )}
            >
              {count} of 300
            </span>
          </div>
        </div>
      )}

      {editMode && <div className={s.plug} />}

      {isOwner && !editMode && (
        // внешний div и input для работы с клавиатуры
        <div aria-hidden='true' onChange={() => setEditMode(true)}>
          <input className={s.visuallyHidden} />
          <div
            aria-hidden='true'
            className={cn(s.statusMy, s.elementInteractive)}
            onClick={() => setEditMode(true)}
          >
            {status || <span className={s.noStatus}>Your status is empty</span>}
          </div>
        </div>
      )}

      {!isOwner && status && <div className={s.statusNotMy}>{status}</div>}
    </div>
  )
}

export default ProfileStatus
