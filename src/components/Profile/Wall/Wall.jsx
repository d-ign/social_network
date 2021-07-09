import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Post from './Post/Post';

import s from './Wall.module.css';
import renderTextField from '../../../components/common/ElementCustom/renderTextField';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

const Wall = (props) => {

  let postsElements = props.posts.map(p =>
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let handleAddPost = (values) => {
    // values - введённые данные в форме (name='newPostText' см. у Field)
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.container}>
      <PostReduxForm onSubmit={handleAddPost} />
      {postsElements}
    </div>
  )
}

const AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div className={s.wrapSendAndButton}>
      <Field
        component={renderTextField}
        name='newPostText'
        placeholder='Enter the post text...'
        multiline={true}
        fullWidth={true}
        variant="outlined"
        inputProps={{ maxLength: 1000 }}
      />
      <Button
        type='submit'
        variant="contained"
        color='primary'
        style={{ color: 'white', marginLeft: '10px', width: '160px' }}
        endIcon={<PostAddIcon />}
      >Add post</Button>
    </div>
  </form>
}

const PostReduxForm = reduxForm({ form: 'profileNewPostForm' })(AddNewPostForm);

export default Wall;