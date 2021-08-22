import React from 'react'
import { useSelector } from 'react-redux'

import cn from 'classnames'
import preloaderTheme1 from '../../../img/preloader/preloaderTheme1.svg'
import preloaderTheme2 from '../../../img/preloader/preloaderTheme2.svg'
import s from './Preloader.module.scss'

import { getTheme } from '../../../redux/selectors/app-selectors'

type PropsType = {
  display?: 'default' | 'block'
}

const Preloader: React.FC<PropsType> = ({ display = 'default' }) => {
  const theme = useSelector(getTheme)

  return (
    <div
      className={cn(
        { [s.container_default]: display === 'default' },
        { [s.container_block]: display === 'block' }
      )}
    >
      <div className={s.wrap}>
        <img
          src={theme === 'theme1' ? preloaderTheme1 : preloaderTheme2}
          alt='preloader'
        />
      </div>
    </div>
  )
}

export default Preloader
