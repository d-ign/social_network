import React from 'react';
import Post from './Post/Post';
import s from './Wall.module.css';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../utils/validators/validators';
import { Element } from '../../common/FormsControls/FormsControls';

const Wall = (props) => {

  let postsElements = props.posts.map(p =>
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let handleAddPost = (values) => {
    // values - введённые данные в форме (name='newPostText' см. у Field)
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.pageWall}>
      <span className={s.pageWall__title}>Стена</span>
      <PostReduxForm onSubmit={handleAddPost} />
      {postsElements}
    </div>
  )
}


const maxLength30 = maxLengthCreator(30);
const Textarea = Element("textarea");

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name='newPostText'
        component={Textarea}
        validate={[maxLength30]}
        placeholder='Write post...'
      />
      <button>Добавить пост</button>
    </form>
  )
}

const PostReduxForm = reduxForm({ form: 'profileNewPostForm' })(AddNewPostForm);

export default Wall;