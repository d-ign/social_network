// для запуска всех тестов используется команда npm run test
// запускаются те файлы, где через точку в имени файла написано test
// TDD (test driving development) подход: сначала пишутся тесты, потом логику под них

import { PostType } from '../../../types/types';
import profileReducer, { actions, InitialStateType } from '../profile-reducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    posts: [
      {
        author: 'Denis Ignatov',
        idPost: '1', 
        message: 'Привет!', 
        likesCount: 0, 
        isLikeClick: false 
      },
      {
        author: 'Denis Ignatov',
        idPost: '2', 
        message: 'Как дела?', 
        likesCount: 0, 
        isLikeClick: false 
      },
    ] as Array<PostType>,

    postsForDelete: [] as Array<string>,
    isSelectedPost: false,
    isClickDeleteSelectedPosts: false,

    profile: null,
    status: '',
    showSuccessSave: '',
    errorProfileContacts: '',
  }
})

test('message of new post should be correct', () => {
  // 1. тестовые данные
  const action = actions.addPost('text123');
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts[0].message).toBe('text123'); // пост добавился в начало массива
})

test('length of post should be incremented', () => {
  // 1. тестовые данные
  const action = actions.addPost('text123');
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts.length).toBe(3);
})

test('after deleting length of messages should be decrement', () => {
  // 1. тестовые данные
  const action = actions.deletePost('1');
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts.length).toBe(1);
})