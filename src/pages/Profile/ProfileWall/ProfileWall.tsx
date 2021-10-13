/* eslint-disable max-len */
import React, { useCallback, useEffect, useState, memo } from 'react'

import Button from '@mui/material/Button'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { IconButton, TextField } from '@mui/material'
import s from './ProfileWall.module.scss'
import stylesAdaptiveButtons from './ProfileButtonsPostsDelete/ProfileButtonsPostsDelete.module.scss'

import ProfileButtonsPostsDelete from './ProfileButtonsPostsDelete/ProfileButtonsPostsDelete'
import ProfilePost from './ProfilePost/ProfilePost'
import NoElement from '../../../components/NoElement/NoElement'
import useLocalStorage from '../../../services/hooks/useLocalStorage'
import { useAppDispatch, useAppSelector } from '../../../services/hooks/useApp'

import {
  getPosts,
  getProfile,
  getPostsForDelete,
} from '../../../store/selectors/profile-selectors'
import {
  addPost,
  deletePost,
  initializePosts,
} from '../../../store/reducers/profile-wall-reducer'
import { getTheme } from '../../../store/selectors/app-selectors'

import { PostType } from '../../../types/types'

const ProfileWall: React.FC = () => {
  const posts = useAppSelector(getPosts)
  const profile = useAppSelector(getProfile)
  const postsForDelete = useAppSelector(getPostsForDelete)
  const dispatch = useAppDispatch()

  const [isShowPrompt, setIsShowPrompt] = useState(true)
  const [isShowAnimation, setIsShowAnimation] = useState(false)
  const [isCancelDeletion, setIsCancelDeletion] = useState(false)
  const [isSelectedAllPosts, setIsSelectedAllPosts] = useState(false)
  const [isHiddenAllLikeAndXAndPrompt, setIsHiddenAllLikeAndXAndPrompt] =
    useState(false)

  useLocalStorage({ key: 'posts', value: posts, action: initializePosts })

  const handleDeleteOnePost = useCallback(
    (idPost: number) => {
      dispatch(deletePost({ idPost }))
    },
    [dispatch]
  )

  useEffect(() => {
    if (postsForDelete.size === posts.length) {
      setIsSelectedAllPosts(true)
    } else {
      setIsSelectedAllPosts(false)
    }
  }, [postsForDelete.size, posts.length])

  const postsElements = posts.map((p: PostType) => (
    <ProfilePost
      key={p.idPost}
      post={{
        idPost: p.idPost,
        message: p.message,
        likesCount: p.likesCount,
        isLikeClick: p.isLikeClick,
      }}
      profile={profile}
      idPostFirst={posts[0].idPost}
      isShowPrompt={isShowPrompt}
      setIsShowPrompt={setIsShowPrompt}
      isSelectedAllPosts={isSelectedAllPosts}
      isHiddenAllLikeAndXAndPrompt={isHiddenAllLikeAndXAndPrompt}
      setIsHiddenAllLikeAndXAndPrompt={setIsHiddenAllLikeAndXAndPrompt}
      isShowAnimation={isShowAnimation}
      isCancelDeletion={isCancelDeletion}
      setIsCancelDeletion={setIsCancelDeletion}
      handleDeleteOnePost={handleDeleteOnePost}
    />
  ))

  return (
    <section className={s.container}>
      <h1 className={s.visuallyHidden}>Profile wall</h1>

      <ProfileButtonsPostsDelete
        posts={posts}
        postsForDelete={postsForDelete}
        isSelectedAllPosts={isSelectedAllPosts}
        setIsSelectedAllPosts={setIsSelectedAllPosts}
        setIsHiddenAllLikeAndXAndPrompt={setIsHiddenAllLikeAndXAndPrompt}
        setIsCancelDeletion={setIsCancelDeletion}
        setIsShowAnimation={setIsShowAnimation}
      />

      {postsForDelete.size === 0 && <AddPostForm />}

      <div className={s.posts}>
        {postsElements}

        {!posts.length && <NoElement elements='posts' writeSomething />}
      </div>
    </section>
  )
}

const AddPostForm: React.FC = memo(() => {
  const stylesAddPostButton: React.CSSProperties = {
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
    margin: '10px 0 10px 10px',
    width: '140px',
  }

  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  const [newPostTextLocal, setNewPostTextLocal] = useState('')

  const handleAddPost = () => {
    if (!newPostTextLocal.trim()) {
      return
    }
    dispatch(addPost({ newPostText: newPostTextLocal }))
    setNewPostTextLocal('')
  }

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostTextLocal(e.target.value)
  }

  return (
    <div className={s.form}>
      <TextField
        name='newPostText'
        placeholder='Enter the post text...'
        multiline
        fullWidth
        variant='outlined'
        color={theme === 'theme1' ? 'primary' : 'secondary'}
        inputProps={{ maxLength: 1000, value: newPostTextLocal }}
        onChange={handleChangeTextField}
      />
      <div className={stylesAdaptiveButtons.buttonDesktop}>
        <Button
          variant='contained'
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          style={stylesAddPostButton}
          endIcon={<PostAddIcon />}
          onClick={handleAddPost}
        >
          Add post
        </Button>
      </div>
      <div hidden className={stylesAdaptiveButtons.buttonMobile}>
        <IconButton
          title='Add post'
          aria-label='Add post'
          style={{ marginLeft: 5 }}
          onClick={handleAddPost}
          size='large'
        >
          <PostAddIcon color={theme === 'theme1' ? 'primary' : 'secondary'} />
        </IconButton>
      </div>
    </div>
  )
})

export default memo(ProfileWall)
