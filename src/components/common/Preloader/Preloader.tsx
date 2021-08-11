import React from 'react'
import { useSelector } from 'react-redux'

import preloaderTheme1 from '../../../img/preloader/preloaderTheme1.svg'
import preloaderTheme2 from '../../../img/preloader/preloaderTheme2.svg'
import s from './Preloader.module.scss'

import { getTheme } from '../../../redux/selectors/app-selectors'

const Preloader: React.FC = () => {
  const theme = useSelector(getTheme)

  return (
    <div className={s.container}>
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
