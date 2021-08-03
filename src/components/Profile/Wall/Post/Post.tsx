import React, { useState } from 'react';
import { actions } from '../../../../redux/reducers/profile-reducer';
import { getIsSelectedPost, getPostsForDelete, getToggleClickDeleteSelectedPosts } from '../../../../redux/selectors/profile-selectors';
import { useDispatch, useSelector } from 'react-redux';

import s from './Post.module.css';
import cn from 'classnames';
import unknown from './../../../../img/no_photo.svg';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '../../../common/Avatar/Avatar';

import { PostType } from '../../../../types/types';

type OwnPropsType = {
  photo: string | null
  handleDeleteOnePost: (idPost: string) => void
  addIdPostBeforeDeleting: (idPost: string) => void
  deleteIdPostBeforeDeleting: (idPost: string) => void
}

const Post: React.FC<PostType & {} & OwnPropsType> = (props) => {
  let {
    idPost,
    author,
    message,
    likesCount,
    isLikeClick,
    photo,
    handleDeleteOnePost,
    addIdPostBeforeDeleting,
    deleteIdPostBeforeDeleting
  } = props

  let [isClickDeletePost, setIsClickDeletePost] = useState(false)
  let [isSelectedPostLocal, setIsSelectedPostLocal] = useState(false)

  const isSelectedPost = useSelector(getIsSelectedPost)
  const isClickDeleteSelectedPosts = useSelector(getToggleClickDeleteSelectedPosts)
  const postsForDelete = useSelector(getPostsForDelete)
  const dispatch = useDispatch()

  const handleDeletePost = () => {
    setIsClickDeletePost(true)
    setTimeout(() => handleDeleteOnePost(idPost), 300)
  }

  const handleSetLike = () => {
    if (!isLikeClick) {
      dispatch(actions.setLikeOnPost(idPost))
    } else {
      dispatch(actions.deletetLikeOnPost(idPost))
    }
  }

  return <div className={cn(
    s.postContainer,
    {
      [s.postDelete]: isClickDeletePost
        || (isClickDeleteSelectedPosts && postsForDelete.includes(idPost))
      // добавление анимации
    }
  )}>
    <div className={s.post}>

      <div className={s.columnLeft}>
        <div className={cn(
          { [s.avatar]: !isSelectedPostLocal },
          { [s.postSelected]: isSelectedPostLocal },
        )} onClick={() => {
          if (!isSelectedPostLocal) {
            // для убирания иконок-крестиков у всех постов
            dispatch(actions.toggleIsSelectedPost(true))
            setIsSelectedPostLocal(true)
            // предварительное добавление поста в список на удаление
            addIdPostBeforeDeleting(idPost)
          } else {
            dispatch(actions.toggleIsSelectedPost(false))
            setIsSelectedPostLocal(false)
            deleteIdPostBeforeDeleting(idPost)
          }
        }}>
          <Avatar photo={photo ? photo : unknown} size='medium' />
        </div>
      </div>

      <div className={s.columnCenter}>
        <div className={s.name}>
          {author}
        </div>
        <div className={s.message}>
          {message}
        </div>
      </div>

      <div className={s.columnRight}>
        <div hidden={isSelectedPost}>
          <IconButton
            aria-label="deletePost"
            size="small"
            onClick={handleDeletePost}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={s.wrapLike}>
          <span className={s.like}>
            {likesCount > 0 ? `+${likesCount}` : ''}
          </span>
          <IconButton
            aria-label="like"
            size="small"
            onClick={handleSetLike}>
            <ThumbUpAltIcon
              style={
                isLikeClick
                  ? { color: '#00bcd4' }
                  : { color: '#b2ebf2' }
              }
            />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
}

export default Post;