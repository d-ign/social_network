import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
} from 'react'
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

type PropsType = {
  post: PostType
  profile: ProfileType | null
  isShowAnimation: boolean
  isCancelDeletion: boolean
  isSelectedAllPosts: boolean
  isHiddenAllLikeAndX: boolean
  setIsCancelDeletion: Dispatch<SetStateAction<boolean>>
  setIsHiddenAllLikeAndX: Dispatch<SetStateAction<boolean>>
  handleDeleteOnePost: (idPost: number) => void
}

const ProfilePost: React.FC<PropsType> = (props) => {
  const {
    post: { idPost, message, likesCount, isLikeClick },
    profile,
    isShowAnimation,
    isCancelDeletion,
    isSelectedAllPosts,
    isHiddenAllLikeAndX,
    handleDeleteOnePost,
    setIsCancelDeletion,
    setIsHiddenAllLikeAndX,
  } = props

  const theme = useSelector(getTheme)
  const postsForDelete = useSelector(getPostsForDelete)
  const dispatch = useDispatch()

  const [isClickDeletePost, setIsClickDeletePost] = useState(false)
  const [isSelectedPost, setIsSelectedPost] = useState(false)

  useEffect(() => {
    if (isSelectedAllPosts || postsForDelete.has(idPost)) {
      setIsSelectedPost(true)
    } else {
      setIsSelectedPost(false)
    }
  }, [isSelectedAllPosts, postsForDelete, idPost])

  useEffect(() => {
    setIsSelectedPost(false)
    setIsCancelDeletion(false)
  }, [isCancelDeletion, setIsCancelDeletion])

  useEffect(() => {
    if (postsForDelete.size === 0) {
      // возвращаем все Х и лайки, если больше нет выбранных постов
      setIsHiddenAllLikeAndX(false)
    }
  }, [postsForDelete, setIsHiddenAllLikeAndX])

  const handleClickOnAvatar = () => {
    if (!isSelectedPost) {
      setIsHiddenAllLikeAndX(true)
      setIsSelectedPost(true)
      dispatch(actions.setPostForDeleting(idPost))
    } else {
      if (postsForDelete.size === 0) {
        // не возвращаем все Х и лайки, если ещё выбраны какие-то посты
        setIsHiddenAllLikeAndX(false)
      }
      setIsSelectedPost(false)
      dispatch(actions.deletePostForDeleting(idPost))
    }
  }

  const handleDeletePost = useCallback(() => {
    setIsClickDeletePost(true)
    setTimeout(() => handleDeleteOnePost(idPost), 300)
  }, [handleDeleteOnePost, idPost])

  const handleSetLike = useCallback(() => {
    if (!isLikeClick) {
      dispatch(actions.setLikeOnPost(idPost))
    } else {
      dispatch(actions.deleteLikeOnPost(idPost))
    }
  }, [dispatch, idPost, isLikeClick])

  return (
    <article
      className={cn(s.postContainer, {
        [s.postContainerDelete]:
          isClickDeletePost || (isShowAnimation && postsForDelete.has(idPost)),
      })}
    >
      <div className={cn(s.post, { [s.postSelected]: isSelectedPost })}>
        <div className={s.columnLeft}>
          <div
            aria-hidden='true'
            onClick={handleClickOnAvatar}
            className={cn(
              { [s.avatar]: !isSelectedPost },
              {
                [s.postSelectedTheme1]: isSelectedPost && theme === 'theme1',
              },
              {
                [s.postSelectedTheme2]: isSelectedPost && theme === 'theme2',
              },
              s.elementInteractive
            )}
          >
            <Avatar
              photo={profile?.photos.large || unknown}
              size='medium'
              id={profile?.userId || null}
            />
          </div>
        </div>

        <div className={s.columnCenter}>
          <Name id={profile?.userId} name={profile?.fullName} size='normal' />
          <div className={s.message}>{message}</div>
        </div>

        {!isHiddenAllLikeAndX ? (
          <div className={s.columnRight}>
            <ButtonDeletePost handleDeletePost={handleDeletePost} />
            <ButtonSetLike
              likesCount={likesCount}
              handleSetLike={handleSetLike}
              isLikeClick={isLikeClick}
            />
          </div>
        ) : (
          <div className={s.plugColumnRight} />
        )}
      </div>
    </article>
  )
}

const ButtonDeletePost: React.FC<{ handleDeletePost: () => void }> = memo(
  ({ handleDeletePost }) => {
    return (
      <IconButton title='Delete post' size='small' onClick={handleDeletePost}>
        <CloseIcon />
      </IconButton>
    )
  }
)

type ButtonSetLikePropsType = {
  likesCount: number
  handleSetLike: () => void
  isLikeClick: boolean
}

const ButtonSetLike: React.FC<ButtonSetLikePropsType> = memo(
  ({ likesCount, handleSetLike, isLikeClick }) => {
    return (
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
    )
  }
)

export default memo(ProfilePost)
