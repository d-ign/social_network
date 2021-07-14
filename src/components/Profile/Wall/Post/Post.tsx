import React from 'react';

import s from './Post.module.css';
import avatar from '../../../../img/avatar_2.jpg';
import unknown from './../../../../img/no_photo.svg';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { PostType } from '../../../../types/types';

const Post: React.FC<PostType> = (props) => {
  return <div className={s.container}>
    <div>
      <div className={s.avatar}>
        <img src={avatar !== null ? avatar : unknown} alt="avatar" />
      </div>
    </div>

    <div className={s.nameAndPost}>
      <div className={s.name}>
        Name user
      </div>

      <div className={s.message}>
        {props.message}
      </div>

      <div className={s.wrapLike}>
        <IconButton aria-label="like" size="small">
          <ThumbUpAltIcon/>
        </IconButton>
        <span className={s.like}>{props.likesCount}</span>
      </div>
    </div>
  </div>
}

export default Post;