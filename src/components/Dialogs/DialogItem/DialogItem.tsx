import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <NavLink className={s.active} to={path} style={{color: 'white'}}>
    {props.name}
    </NavLink>
  )
}

export default DialogItem;