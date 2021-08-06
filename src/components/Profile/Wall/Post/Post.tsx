import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CloseIcon from '@material-ui/icons/Close'
import unknown from '../../../../img/no_photo.svg'
import s from './Post.module.scss'
import {
  getIsSelectedPost,
  getPostsForDelete,
  getToggleClickDeleteSelectedPosts,
} from '../../../../redux/selectors/profile-selectors'
import { actions } from '../../../../redux/reducers/profile-reducer'
import Avatar from '../../../common/Avatar/Avatar'

import { PostType } from '../../../../types/types'

type OwnPropsType = {
  photo: string | null
  handleDeleteOnePost: (idPost: string) => void
  addIdPostBeforeDeleting: (idPost: string) => void
  deleteIdPostBeforeDeleting: (idPost: string) => void
}

const Post: React.FC<PostType & OwnPropsType> = (props) => {
  const {
    idPost,
    author,
    message,
    likesCount,
    isLikeClick,
    photo,
    handleDeleteOnePost,
    addIdPostBeforeDeleting,
    deleteIdPostBeforeDeleting,
  } = props

  const [isClickDeletePost, setIsClickDeletePost] = useState(false)
  const [isSelectedPostLocal, setIsSelectedPostLocal] = useState(false)

  const isSelectedPost = useSelector(getIsSelectedPost)
  const isClickDeleteSelectedPosts = useSelector(
    getToggleClickDeleteSelectedPosts
  )
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

  return (
    <div
      className={cn(s.postContainer, {
        [s.postDelete]:
          isClickDeletePost ||
          (isClickDeleteSelectedPosts && postsForDelete.includes(idPost)),
        // добавление анимации
      })}
    >
      <div className={s.post}>
        <div className={s.columnLeft}>
          <div
            aria-hidden='true'
            className={cn(
              { [s.avatar]: !isSelectedPostLocal },
              { [s.postSelected]: isSelectedPostLocal }
            )}
            onClick={() => {
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
            }}
          >
            <Avatar photo={photo || unknown} size='medium' />
          </div>
        </div>

        <div className={s.columnCenter}>
          <div className={s.name}>{author}</div>
          <div className={s.message}>{message}</div>
        </div>

        <div className={s.columnRight}>
          <div hidden={isSelectedPost}>
            <IconButton
              aria-label='deletePost'
              size='small'
              onClick={handleDeletePost}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={s.wrapLike}>
            <span className={s.likesCount}>
              {likesCount > 0 ? `+${likesCount}` : ''}
            </span>
            <IconButton aria-label='like' size='small' onClick={handleSetLike}>
              <ThumbUpAltIcon
                className={cn(s.like, { [s.noLike]: !isLikeClick })}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
