import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { IconButton, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import cn from 'classnames'
import s from './Wall.module.scss'

import Post from './Post/Post'
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

const Wall: React.FC = () => {
  const posts = useSelector(getPosts)
  const postsForDelete = useSelector(getPostsForDelete)
  const profile = useSelector(getProfile)
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const [isShowAnimation, setIsShowAnimation] = useState(false)
  const [isHiddenAllX, setIsHiddenAllX] = useState(false)

  useLocalStorage('posts', posts, actions.initializePosts)

  const handleDeleteOnePost = (idPost: number) => {
    dispatch(actions.deletePost(idPost))
  }

  const handleDeleteSelectedPost = () => {
    // начало анимации удаления
    setIsShowAnimation(true)

    // возвращаем индивидуальные иконки-крестики у всех постов
    setIsHiddenAllX(false)

    setTimeout(() => {
      postsForDelete.forEach((p) => {
        dispatch(actions.deletePost(p))
      })
      dispatch(actions.clearPostsForDelete())

      // конец анимации удаления
      setIsShowAnimation(false)
    }, 600)
  }

  const addIdPostBeforeDeleting = (idPost: number) => {
    dispatch(actions.setPostForDeleting(idPost))
  }

  const deleteIdPostBeforeDeleting = (idPost: number) => {
    dispatch(actions.deletePostForDeleting(idPost))
  }

  const postsElements = posts.map((p: PostType) => (
    <Post
      key={p.idPost}
      profile={profile}
      post={{
        idPost: p.idPost,
        message: p.message,
        likesCount: p.likesCount,
        isLikeClick: p.isLikeClick,
      }}
      isHiddenAllX={isHiddenAllX}
      setIsHiddenAllX={setIsHiddenAllX}
      isShowAnimation={isShowAnimation}
      handleDeleteOnePost={handleDeleteOnePost}
      addIdPostBeforeDeleting={addIdPostBeforeDeleting}
      deleteIdPostBeforeDeleting={deleteIdPostBeforeDeleting}
    />
  ))

  return (
    <div className={s.container}>
      <div
        hidden={postsForDelete.length === 0}
        className={cn({ [s.basket]: postsForDelete.length > 0 })}
      >
        <Button
          onClick={() => handleDeleteSelectedPost()}
          variant='contained'
          color={theme === 'theme1' ? 'primary' : 'secondary'}
          style={{ color: 'white', width: '100%', height: '100%' }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>

      {postsForDelete.length === 0 && <Form theme={theme} />}

      <div className={s.posts}>
        {postsElements}

        {!posts.length && <NoElement elements='posts' writeSomething />}
      </div>
    </div>
  )
}

type OwnPropsType = {
  theme: string
}

const Form: React.FC<OwnPropsType> = ({ theme }) => {
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
        <div className={s.buttonBig}>
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
        <div hidden className={s.buttonIcon}>
          <IconButton
            aria-label='addPost'
            onClick={handleAddPost}
            style={{ marginLeft: 5 }}
          >
            <PostAddIcon color='primary' />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Wall
