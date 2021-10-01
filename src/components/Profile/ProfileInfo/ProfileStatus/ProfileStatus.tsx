import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
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
  const status = useSelector(getStatus)

  const [editMode, setEditMode] = useState(false)
  const [statusLocal, setStatusLocal] = useState(status)

  useEffect(() => {
    setStatusLocal(status)
  }, [status])

  const statusRef = useRef<HTMLDivElement | null>(null)
  useOutsideAlerter(statusRef, setEditMode)

  return (
    <div ref={statusRef} className={s.container}>
      {isOwner && !editMode && (
        <Status status={status} setEditMode={setEditMode} />
      )}

      {!isOwner && status && <div className={s.statusNotMy}>{status}</div>}

      {editMode && (
        <StatusForm
          statusLocal={statusLocal}
          setStatusLocal={setStatusLocal}
          setEditMode={setEditMode}
        />
      )}
    </div>
  )
}

type StatusPropsType = {
  status: string
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const Status: React.FC<StatusPropsType> = ({ status, setEditMode }) => {
  const handleClick = () => {
    setEditMode(true)
  }

  return (
    // внешний div и input для работы с клавиатуры
    <div title='Change status' aria-hidden='true' onChange={handleClick}>
      <input className={s.visuallyHidden} aria-label='Change status profile' />
      <div
        aria-hidden='true'
        className={cn(s.statusMy, s.elementInteractive)}
        onClick={handleClick}
      >
        {status || <span className={s.noStatus}>Your status is empty</span>}
      </div>
    </div>
  )
}

type StatusFormPropsType = {
  statusLocal: string
  setStatusLocal: Dispatch<SetStateAction<string>>
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const StatusForm: React.FC<StatusFormPropsType> = ({
  statusLocal,
  setStatusLocal,
  setEditMode,
}) => {
  const classes = useStyles()

  const stylesSaveAndButton: React.CSSProperties = {
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
    boxShadow: '2px 2px 5px var(--color-darkBlueTransparent)',
    margin: 10,
    width: '100%',
  }

  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [isEditInputStatusForm, setIsEditInputStatusForm] = useState(false)
  const [isHiddenCounter, setIsHiddenCounter] = useState(true)
  const [count, setCount] = useState(0)

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

  return (
    <>
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
      <div className={s.plug} />
    </>
  )
}

export default ProfileStatus
