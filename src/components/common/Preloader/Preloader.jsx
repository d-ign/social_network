import React from 'react';
import preloader from '../../../img/preloader.svg';

const stylesContainer = {
  position: 'absolute', 
  left: 'calc(50% - 85px)',
}

const stylesWrap = {
  display: 'flex', 
  justifyContent: 'center',
}

const Preloader = () => {
  return <div style={stylesContainer}>
    <div style={stylesWrap}>
      <img src={preloader} alt='preloader' />
    </div>
  </div>

};

export default Preloader;