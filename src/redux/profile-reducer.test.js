// для запуска всех тестов используется команда npm run test
// запускаются те файлы где через точку в имени файла написано test

import profileReducer, { addPost, deletePost } from './profile-reducer';

let state = {
  posts: [
    { id: '1', message: 'Стена Привет!', likesCount: 12 },
    { id: '2', message: 'Стена Как дела?', likesCount: 4 },
  ],
};

test('message of new post should be correct', () => {
  // 1. тестовые данные
  const action = addPost('text123');
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts[2].message).toBe('text123');
});

test('length of post should be incremented', () => {
  // 1. тестовые данные
  const action = addPost('text123');
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts.length).toBe(3);
});

// TDD (test driving development) подход: сначала пишутся тесты, потом логику под них
test('after deleting length of messages should be decrement', () => {
  // 1. тестовые данные
  const action = deletePost(1);
  // 2. действие
  const newState = profileReducer(state, action);
  // 3. ожидание
  expect(newState.posts.length).toBe(1);
});