import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../../redux/reducers/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { PostType } from '../../../types/types';
import Wall from './Wall';

export type MapStatePropsType = {
  posts: Array<PostType>
}

export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    {
      addPost: actions.addPost
    }
  ))(Wall);