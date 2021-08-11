import React from 'react'
import preloaderStart from '../../../img/preloader/preloaderStart.svg'
import s from './Preloader.module.scss'

const PreloaderStart: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <img src={preloaderStart} alt='preloader' />
      </div>
    </div>
  )
}

export default PreloaderStart
