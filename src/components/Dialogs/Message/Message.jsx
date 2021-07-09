import React from 'react';
import s from '../Dialogs.module.css';

const Message = (props) => {
  return <div className={s.message}
    style={{ overflowWrap: 'break-word', width: '400px', marginBottom: 20 }}>
    {props.text}
  </div>
}

export default Message;