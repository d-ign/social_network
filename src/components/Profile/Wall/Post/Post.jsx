import React from 'react';
import s from './Post.module.css';
import avatar from '../../../../img/avatar_2.jpg';

const Post = (props) => {
  return(

    <div className={s.pageWall__newPost}>
      <img src={avatar} alt="avatar"/>
      {props.message}
      {props.likesCount} <button>like</button>
    </div>

  )
}

export default Post;