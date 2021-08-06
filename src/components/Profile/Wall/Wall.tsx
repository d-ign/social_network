import React from 'react'
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import Button from '@material-ui/core/Button'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  getPosts,
  getPostsForDelete,
} from '../../../redux/selectors/profile-selectors'
import { getMyPhoto } from '../../../redux/selectors/auth-selectors'
import { actions } from '../../../redux/reducers/profile-reducer'

import Post from './Post/Post'
import { PostType } from '../../../types/types'

import s from './Wall.module.scss'
import renderTextField from '../../common/ElementCustom/renderTextField.jsx'

const Wall: React.FC = () => {
  const posts = useSelector(getPosts)
  const postsForDelete = useSelector(getPostsForDelete)
  const myPhoto = useSelector(getMyPhoto)
  const dispatch = useDispatch()

  React.useEffect(() => {
    // @ts-ignore
    const arr = JSON.parse(localStorage.getItem('posts'))
    if (arr) {
      dispatch(actions.initializePosts(arr))
    }
  }, [dispatch])

  React.useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const handleAddPost = (values: WallValuesFormType) => {
    if (values.newPostText && values.newPostText.length > 0) {
      dispatch(actions.addPost(values.newPostText))
      dispatch(reset('profileNewPostForm'))
    }
  }

  const handleDeleteOnePost = (idPost: string) => {
    dispatch(actions.deletePost(idPost))
  }

  const handleDeleteSelectedPost = () => {
    // начало анимации удаления
    dispatch(actions.toggleIsClickDeleteSelectedPosts(true))
    // возвращаем индивидуальные иконки-крестики у всех постов
    dispatch(actions.toggleIsSelectedPost(false))

    setTimeout(() => {
      postsForDelete.forEach((p) => {
        dispatch(actions.deletePost(p))
      })
      dispatch(actions.clearPostsForDelete())

      // конец анимации удаления
      dispatch(actions.toggleIsClickDeleteSelectedPosts(false))
    }, 600)
  }

  const addIdPostBeforeDeleting = (idPost: string) => {
    dispatch(actions.setPostForDeleting(idPost))
  }

  const deleteIdPostBeforeDeleting = (idPost: string) => {
    dispatch(actions.deletePostForDeleting(idPost))
  }

  const postsElements = posts.map((p: PostType) => (
    <Post
      key={p.idPost}
      idPost={p.idPost}
      author={p.author}
      message={p.message}
      likesCount={p.likesCount}
      isLikeClick={p.isLikeClick}
      photo={myPhoto}
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
          color='primary'
          style={{ color: 'white', width: '100%', height: '100%' }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>

      {postsForDelete.length === 0 && (
        // @ts-ignore
        <PostReduxForm onSubmit={handleAddPost} />
      )}

      <div className={s.posts}>
        {postsElements}
        {!posts.length && (
          <div className={s.noPosts}>
            <span>No posts yet...</span>
            <span>Write something!</span>
          </div>
        )}
      </div>
    </div>
  )
}

const AddNewPostForm: React.FC<InjectedFormProps<WallValuesFormType>> = ({
  handleSubmit,
}) => {
  const stylesAddPostButton = {
    color: 'white',
    margin: '10px 0 10px 10px',
    width: '140px',
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.form}>
        <Field
          component={renderTextField}
          name='newPostText'
          placeholder='Enter the post text...'
          multiline
          fullWidth
          variant='outlined'
          inputProps={{ maxLength: 1000 }}
        />
        <div className={s.buttonBig}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={stylesAddPostButton}
            endIcon={<PostAddIcon />}
          >
            Add post
          </Button>
        </div>
        <div hidden className={s.buttonIcon}>
          <IconButton aria-label='addPost' type='submit'>
            <PostAddIcon color='primary' />
          </IconButton>
        </div>
      </div>
    </form>
  )
}

type WallValuesFormType = {
  newPostText: string
}

const PostReduxForm = reduxForm<WallValuesFormType>({
  form: 'profileNewPostForm',
})(AddNewPostForm)

export default Wall
