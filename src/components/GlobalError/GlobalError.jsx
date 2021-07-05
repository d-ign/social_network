import React from 'react';

const GlobalError = (props) => {
  return <div>Oh, an error occured: 
  <div style={{fontWeight: 'bold', color: 'red'}}>{props.error}</div>
  </div>
};

export default GlobalError;