import React from 'react';
import preloader from '../../../img/preloader.svg';

const Preloader = () => {
  return <div style={{display: 'flex', justifyContent: 'center'}}>
    <img src={preloader} alt='preloader' />
  </div>
  
};

export default Preloader;