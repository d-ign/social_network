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
import s from './ProfilePost.module.scss'

import ProfileAvatarPost from './ProfileAvatarPost/ProfileAvatarPost'
import Name from '../../../common/Name/Name'

import { getPostsForDelete } from '../../../../redux/selectors/profile-selectors'
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

  const postsForDelete = useSelector(getPostsForDelete)

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
      // return all X and likes if there are no more selected posts
      setIsHiddenAllLikeAndX(false)
    }
  }, [postsForDelete, setIsHiddenAllLikeAndX])

  return (
    <article
      className={cn(s.postContainer, {
        [s.postContainerDelete]:
          isClickDeletePost || (isShowAnimation && postsForDelete.has(idPost)),
      })}
    >
      <div className={cn(s.post, { [s.postSelected]: isSelectedPost })}>
        <div className={s.columnLeft}>
          <ProfileAvatarPost
            idPost={idPost}
            profile={profile}
            postsForDelete={postsForDelete}
            isSelectedPost={isSelectedPost}
            setIsSelectedPost={setIsSelectedPost}
            setIsHiddenAllLikeAndX={setIsHiddenAllLikeAndX}
          />
        </div>

        <div className={s.columnCenter}>
          <Name id={profile?.userId} name={profile?.fullName} size='normal' />
          <div className={s.message}>{message}</div>
        </div>

        {!isHiddenAllLikeAndX ? (
          <div className={s.columnRight}>
            <ButtonDeletePost
              idPost={idPost}
              handleDeleteOnePost={handleDeleteOnePost}
              setIsClickDeletePost={setIsClickDeletePost}
            />
            <ButtonSetLike
              idPost={idPost}
              likesCount={likesCount}
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

type ButtonDeletePostPropsType = {
  idPost: number
  handleDeleteOnePost: (idPost: number) => void
  setIsClickDeletePost: Dispatch<SetStateAction<boolean>>
}

const ButtonDeletePost: React.FC<ButtonDeletePostPropsType> = memo(
  ({ idPost, handleDeleteOnePost, setIsClickDeletePost }) => {
    const handleDeletePost = useCallback(() => {
      setIsClickDeletePost(true)
      setTimeout(() => handleDeleteOnePost(idPost), 300)
    }, [handleDeleteOnePost, idPost, setIsClickDeletePost])

    return (
      <IconButton title='Delete post' size='small' onClick={handleDeletePost}>
        <CloseIcon />
      </IconButton>
    )
  }
)

type ButtonSetLikePropsType = Omit<PostType, 'message'>

const ButtonSetLike: React.FC<ButtonSetLikePropsType> = memo(
  ({ idPost, likesCount, isLikeClick }) => {
    const dispatch = useDispatch()

    const handleSetLike = useCallback(() => {
      if (!isLikeClick) {
        dispatch(actions.setLikeOnPost(idPost))
      } else {
        dispatch(actions.deleteLikeOnPost(idPost))
      }
    }, [dispatch, idPost, isLikeClick])

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
