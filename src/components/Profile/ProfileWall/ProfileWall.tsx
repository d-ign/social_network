import React, { useCallback, useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import PostAddIcon from '@material-ui/icons/PostAdd'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import cn from 'classnames'
import s from './ProfileWall.module.scss'

import ProfilePost from './ProfilePost/ProfilePost'
import NoElement from '../../common/NoElement/NoElement'
import useLocalStorage from '../../../hooks/useLocalStorage'

import {
  getPosts,
  getPostsForDelete,
  getProfile,
} from '../../../redux/selectors/profile-selectors'
import { actions } from '../../../redux/reducers/profile-reducer'
import { getTheme } from '../../../redux/selectors/app-selectors'

import { PostType } from '../../../types/types'

const ProfileWall: React.FC = () => {
  const stylesButton = {
    color: 'white',
    maxWidth: '120px',
    height: '70%',
    margin: '10px',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
  }

  const theme = useSelector(getTheme)
  const profile = useSelector(getProfile)
  const posts = useSelector(getPosts)
  const postsForDelete = useSelector(getPostsForDelete)
  const dispatch = useDispatch()

  const [isShowAnimation, setIsShowAnimation] = useState(false)
  const [isCancelDeletion, setIsCancelDeletion] = useState(false)
  const [isSelectedAllPosts, setIsSelectedAllPosts] = useState(false)
  const [isHiddenAllLikeAndX, setIsHiddenAllLikeAndX] = useState(false)

  useLocalStorage('posts', posts, actions.initializePosts)

  const handleDeleteOnePost = useCallback(
    (idPost: number) => {
      dispatch(actions.deletePost(idPost))
    },
    [dispatch]
  )

  const handleDeleteSelectedPost = () => {
    // start delete animation
    setIsShowAnimation(true)

    setIsSelectedAllPosts(false)

    // return X and likes on all posts
    setIsHiddenAllLikeAndX(false)

    setTimeout(() => {
      postsForDelete.forEach((p) => {
        dispatch(actions.deletePost(p))
      })
      dispatch(actions.clearPostsForDeleting())

      // end of delete animation
      setIsShowAnimation(false)
    }, 600)
  }

  const handleCancelDeletion = () => {
    dispatch(actions.clearPostsForDeleting())
    setIsCancelDeletion(true)
    setIsSelectedAllPosts(false)
  }

  const handleSelectedAllPosts = () => {
    if (!isSelectedAllPosts) {
      posts.forEach((post) => {
        dispatch(actions.setPostForDeleting(post.idPost))
      })
      setIsSelectedAllPosts(true)
    } else {
      dispatch(actions.clearPostsForDeleting())
      setIsSelectedAllPosts(false)
    }
  }

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
      isSelectedAllPosts={isSelectedAllPosts}
      isHiddenAllLikeAndX={isHiddenAllLikeAndX}
      setIsHiddenAllLikeAndX={setIsHiddenAllLikeAndX}
      isShowAnimation={isShowAnimation}
      isCancelDeletion={isCancelDeletion}
      setIsCancelDeletion={setIsCancelDeletion}
      handleDeleteOnePost={handleDeleteOnePost}
    />
  ))

  return (
    <section className={s.container}>
      <h1 className={s.visuallyHidden}>Profile wall</h1>
      <div className={s.wrapButtons}>
        <div
          hidden={postsForDelete.size === 0}
          className={cn({ [s.buttons]: postsForDelete.size > 0 })}
        >
          <FormControlLabel
            control={
              <Checkbox color={theme === 'theme1' ? 'primary' : 'secondary'} />
            }
            label='Select all'
            labelPlacement='end'
            style={{ marginLeft: '14px' }}
            checked={isSelectedAllPosts && postsForDelete.size === posts.length}
            onChange={handleSelectedAllPosts}
          />

          <div className={s.buttonDesktop}>
            <Button
              variant='contained'
              style={stylesButton}
              startIcon={<DeleteIcon />}
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              onClick={handleDeleteSelectedPost}
            >
              Delete
            </Button>
          </div>
          <div hidden className={s.buttonMobile}>
            <IconButton
              title='Delete'
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              onClick={handleDeleteSelectedPost}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className={s.buttonDesktop}>
            <Button
              variant='outlined'
              style={stylesButton}
              startIcon={<CloseIcon />}
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              onClick={handleCancelDeletion}
            >
              Cancel
            </Button>
          </div>
          <div hidden className={s.buttonMobile}>
            <IconButton
              title='Cancel'
              color={theme === 'theme1' ? 'primary' : 'secondary'}
              onClick={handleCancelDeletion}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {postsForDelete.size === 0 && <AddPostForm theme={theme} />}

      <div className={s.posts}>
        {postsElements}

        {!posts.length && <NoElement elements='posts' writeSomething />}
      </div>
    </section>
  )
}

type OwnPropsType = {
  theme: string
}

const AddPostForm: React.FC<OwnPropsType> = memo(({ theme }) => {
  const stylesAddPostButton: React.CSSProperties = {
    color: 'white',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
    margin: '10px 0 10px 10px',
    width: '140px',
  }

  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const handleAddPost = () => {
    if (!value.trim()) {
      return
    }
    dispatch(actions.addPost(value))
    setValue('')
  }

  return (
    <div>
      <div className={s.form}>
        <TextField
          name='newPostText'
          placeholder='Enter the post text...'
          multiline
          fullWidth
          variant='outlined'
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          inputProps={{ maxLength: 1000, value }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <div className={s.buttonDesktop}>
          <Button
            onClick={handleAddPost}
            variant='contained'
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            style={stylesAddPostButton}
            endIcon={<PostAddIcon />}
          >
            Add post
          </Button>
        </div>
        <div hidden className={s.buttonMobile}>
          <IconButton
            aria-label='addPost'
            onClick={handleAddPost}
            style={{ marginLeft: 5 }}
            title='Add post'
          >
            <PostAddIcon color={theme === 'theme1' ? 'primary' : 'secondary'} />
          </IconButton>
        </div>
      </div>
    </div>
  )
})

export default memo(ProfileWall)
