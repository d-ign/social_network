import React, { useEffect, useState, memo } from 'react'

import s from './User.module.scss'

import Name from '../Name/Name'
import Avatar from '../Avatar/Avatar'
import Tooltip from './Tooltip/Tooltip'
import ButtonFollow from '../ButtonFollow/ButtonFollow'
import useResizeWindow from '../../services/hooks/useResizeWindow'

import { UserType } from '../../types/types'

const User: React.FC<{ user: UserType }> = (props) => {
  const {
    user: { id, photos, name, status, followed },
  } = props

  const [symbolCount, setSymbolCount] = useState(19)
  const widthScreen = useResizeWindow()

  useEffect(() => {
    if (widthScreen <= 735) {
      setSymbolCount(10)
    }
  }, [widthScreen])

  return (
    <article className={s.user}>
      <div className={s.wrapAvatarNameAndStatus}>
        <div className={s.wrapAvatar}>
          <Avatar photo={photos.large} size='large' id={id} />
        </div>
        <div className={s.nameAndStatus}>
          <WithTooltip.Name id={id} name={name} symbolCount={symbolCount} />
          <WithTooltip.Status status={status} symbolCount={symbolCount} />
        </div>
      </div>
      <ButtonFollow id={id} followed={followed} />
    </article>
  )
}

type NameWithTooltipPropsType = {
  id: number
  name: string
  symbolCount: number
}

type StatusWithTooltipPropsType = {
  status: string
  symbolCount: number
}

const WithTooltip = {
  Name: memo<NameWithTooltipPropsType>(({ id, name, symbolCount }) => (
    <>
      {name?.length > symbolCount ? (
        <Tooltip element={name}>
          <div className={s.wrapName}>
            <Name id={id} name={name} />
          </div>
        </Tooltip>
      ) : (
        <div className={s.wrapName}>
          <Name id={id} name={name} />
        </div>
      )}
    </>
  )),

  Status: memo<StatusWithTooltipPropsType>(({ status, symbolCount }) => (
    <>
      {status?.length > symbolCount ? (
        <Tooltip element={status}>
          <div className={s.status}>
            <i>{status}</i>
          </div>
        </Tooltip>
      ) : (
        <div className={s.status}>
          <i>{status}</i>
        </div>
      )}
    </>
  )),
}

export default memo(User)
