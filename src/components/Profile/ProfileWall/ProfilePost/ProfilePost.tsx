import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CloseIcon from '@material-ui/icons/Close'
import unknown from '../../../../img/no_photo.svg'
import s from './ProfilePost.module.scss'

import Avatar from '../../../common/Avatar/Avatar'
import Name from '../../../common/Name/Name'

import { getPostsForDelete } from '../../../../redux/selectors/profile-selectors'
import { getTheme } from '../../../../redux/selectors/app-selectors'
import { actions } from '../../../../redux/reducers/profile-reducer'

import { PostType, ProfileType } from '../../../../types/types'

type OwnPropsType = {
  profile: ProfileType | null
  isShowAnimation: boolean
  isHiddenAllX: boolean
  setIsHiddenAllX: Dispatch<SetStateAction<boolean>>
  handleDeleteOnePost: (idPost: number) => void
  addIdPostBeforeDeleting: (idPost: number) => void
  deleteIdPostBeforeDeleting: (idPost: number) => void
}

const ProfilePost: React.FC<{ post: PostType } & OwnPropsType> = React.memo(
  (props) => {
    const {
      post: { idPost, message, likesCount, isLikeClick },
      profile,
      isHiddenAllX,
      setIsHiddenAllX,
      isShowAnimation,
      handleDeleteOnePost,
      addIdPostBeforeDeleting,
      deleteIdPostBeforeDeleting,
    } = props

    const theme = useSelector(getTheme)
    const postsForDelete = useSelector(getPostsForDelete)
    const dispatch = useDispatch()

    const [isClickDeletePost, setIsClickDeletePost] = useState(false)
    const [isSelectedPost, setIsSelectedPost] = useState(false)

    const handleClickOnAvatar = () => {
      if (!isSelectedPost) {
        setIsHiddenAllX(true)
        setIsSelectedPost(true)
        addIdPostBeforeDeleting(idPost)
      } else {
        if (postsForDelete.length === 0) {
          // не возвращаем все Х, если ещё выбраны какие-то посты
          setIsHiddenAllX(false)
        }
        setIsSelectedPost(false)
        deleteIdPostBeforeDeleting(idPost)
      }
    }

    useEffect(() => {
      if (postsForDelete.length === 0) {
        // возвращаем все Х, если больше нет выбранных постов
        setIsHiddenAllX(false)
      }
    }, [postsForDelete, setIsHiddenAllX])

    const handleDeletePost = () => {
      setIsClickDeletePost(true)
      setTimeout(() => handleDeleteOnePost(idPost), 300)
    }

    const handleSetLike = () => {
      if (!isLikeClick) {
        dispatch(actions.setLikeOnPost(idPost))
      } else {
        dispatch(actions.deleteLikeOnPost(idPost))
      }
    }

    return (
      <div
        className={cn(s.postContainer, {
          [s.postDelete]:
            isClickDeletePost ||
            (isShowAnimation && postsForDelete.includes(idPost)),
        })}
      >
        <div className={s.post}>
          <div className={s.columnLeft}>
            <div
              aria-hidden='true'
              className={cn(
                { [s.avatar]: !isSelectedPost },
                {
                  [s.postSelectedTheme1]: isSelectedPost && theme === 'theme1',
                },
                {
                  [s.postSelectedTheme2]: isSelectedPost && theme === 'theme2',
                }
              )}
              onClick={handleClickOnAvatar}
              title='Select post to delete'
            >
              <Avatar
                photo={profile?.photos.large || unknown}
                size='medium'
                id={profile?.userId}
              />
            </div>
          </div>

          <div className={s.columnCenter}>
            <Name id={profile?.userId} name={profile?.fullName} />
            <div className={s.message}>{message}</div>
          </div>

          <div className={s.columnRight}>
            <div hidden={isHiddenAllX}>
              <IconButton
                title='Delete post'
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
              <IconButton title='Like' size='small' onClick={handleSetLike}>
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
)

export default ProfilePost
