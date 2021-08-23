import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import cn from 'classnames'
import s from './Status.module.scss'
import stylesField from '../../../common/FieldWithCounter/FieldWithCounter.module.scss'
import useStyles from './stylesCustomMaterialUI'
import { getTheme } from '../../../../redux/selectors/app-selectors'

import { getStatus } from '../../../../redux/selectors/profile-selectors'
import { updateStatus } from '../../../../redux/reducers/profile-reducer'

type PropsType = {
  isOwner: boolean
}

const Status = ({ isOwner }: PropsType) => {
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

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (
          ref.current &&
          !ref.current.contains(e.target as HTMLInputElement)
        ) {
          setEditMode(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const statusRef = useRef<HTMLDivElement | null>(null)
  useOutsideAlerter(statusRef)

  return (
    <div ref={statusRef} className={s.container}>
      {editMode && (
        <div className={s.wrap}>
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

          <div className={s.buttons}>
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
