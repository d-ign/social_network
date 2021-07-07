import React from 'react';
import preloader from '../../../img/preloader.svg';

const Preloader = () => {
  return <div style={{ position: 'absolute', left: 'calc(50% - 85px)' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={preloader} alt='preloader' />
    </div>
  </div>

};

export default Preloader;