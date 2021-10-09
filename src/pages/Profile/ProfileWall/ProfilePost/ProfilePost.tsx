import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
} from 'react'

import cn from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CloseIcon from '@material-ui/icons/Close'
import s from './ProfilePost.module.scss'

import Name from '../../../../components/Name/Name'
import Prompt from '../../../../components/Prompt/Prompt'
import ProfileAvatarPost from './ProfileAvatarPost/ProfileAvatarPost'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/hooks/useApp'

import {
  setLikeOnPost,
  deleteLikeOnPost,
} from '../../../../store/reducers/profile-wall-reducer'
import { getPostsForDelete } from '../../../../store/selectors/profile-selectors'

import { PostType, ProfileType } from '../../../../types/types'

type PropsType = {
  post: PostType
  profile: ProfileType | null
  idPostFirst: number
  isShowPrompt: boolean
  isShowAnimation: boolean
  isCancelDeletion: boolean
  isSelectedAllPosts: boolean
  isHiddenAllLikeAndXAndPrompt: boolean
  setIsShowPrompt: Dispatch<SetStateAction<boolean>>
  setIsCancelDeletion: Dispatch<SetStateAction<boolean>>
  setIsHiddenAllLikeAndXAndPrompt: Dispatch<SetStateAction<boolean>>
  handleDeleteOnePost: (idPost: number) => void
}

const ProfilePost: React.FC<PropsType> = (props) => {
  const {
    post: { idPost, message, likesCount, isLikeClick },
    profile,
    idPostFirst,
    isShowPrompt,
    setIsShowPrompt,
    isShowAnimation,
    isCancelDeletion,
    isSelectedAllPosts,
    handleDeleteOnePost,
    setIsCancelDeletion,
    isHiddenAllLikeAndXAndPrompt,
    setIsHiddenAllLikeAndXAndPrompt,
  } = props

  const postsForDelete = useAppSelector(getPostsForDelete)

  const [isSelectedPost, setIsSelectedPost] = useState(false)
  const [isClickDeletePost, setIsClickDeletePost] = useState(false)

  useEffect(() => {
    if (isHiddenAllLikeAndXAndPrompt) {
      setIsShowPrompt(false)
    }
  }, [isHiddenAllLikeAndXAndPrompt, setIsShowPrompt])

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
      setIsHiddenAllLikeAndXAndPrompt(false)
    }
  }, [postsForDelete, setIsHiddenAllLikeAndXAndPrompt])

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
            setIsHiddenAllLikeAndXAndPrompt={setIsHiddenAllLikeAndXAndPrompt}
          />
        </div>

        {idPostFirst === idPost && isShowPrompt && (
          <Prompt.DeletingProfilePosts />
        )}

        <div className={s.columnCenter}>
          <Name id={profile?.userId} name={profile?.fullName} size='normal' />
          <div className={s.message}>{message}</div>
        </div>

        {!isHiddenAllLikeAndXAndPrompt ? (
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
    const dispatch = useAppDispatch()

    const handleSetLike = useCallback(() => {
      if (!isLikeClick) {
        dispatch(setLikeOnPost({ idPost }))
      } else {
        dispatch(deleteLikeOnPost({ idPost }))
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
