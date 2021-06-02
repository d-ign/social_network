import React from 'react';
import s from '../Dialogs.module.css';

const Message = (props) => {
  return <p className={s.message}>{props.text}</p>
}

export default Message;