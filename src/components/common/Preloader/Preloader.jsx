import React from 'react'
import { useSelector } from 'react-redux'
import preloaderTheme1 from '../../../img/preloaderTheme1.svg'
import preloaderTheme2 from '../../../img/preloaderTheme2.svg'
import { getTheme } from '../../../redux/selectors/app-selectors'

const stylesContainer = {
  position: 'absolute',
  left: 'calc(50% - 85px)',
}

const stylesWrap = {
  display: 'flex',
  justifyContent: 'center',
}

const Preloader = () => {
  const theme = useSelector(getTheme)
  return (
    <div style={stylesContainer}>
      <div style={stylesWrap}>
        <img
          src={theme === 'theme1' ? preloaderTheme1 : preloaderTheme2}
          alt='preloader'
        />
      </div>
    </div>
  )
}

export default Preloader
