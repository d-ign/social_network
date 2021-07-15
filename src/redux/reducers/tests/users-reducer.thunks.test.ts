import { actions, follow, unfollow } from "../users-reducer";
import { usersAPI } from '../../../api/users-api';
import { DefaultResponseType, ResultCodesEnum } from '../../../api/api';

//  для теста thunk будем обращаться не к реальному api, а к фейковому - mock, потому что нам нужно проверить BLL, а не api, это unit-test, а не интеграционный
jest.mock('../../../api/users-api');
// далее usersAPI будет уже не реальный, а mock
// usersAPIMock введем для типизации и наглядности
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

// после каждого теста зачищаем мок, иначе диспатчей будет не 3, а 6. Или объявлять dispatchMock внутри каждого теста
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.followUser.mockClear();
  usersAPIMock.unfollowUser.mockClear();
})

// в response в reducer будет сидеть теперь этот объект, т.к. вызов мы подменили на фейковый
const response: DefaultResponseType = {
  data: {},
  resultCode: ResultCodesEnum.Success,
  messages: [],
}

test('success follow thunk', async () => {
  // при вызове followUser из api мы получаем фейковый response, объявленный выше
  usersAPIMock.followUser.mockResolvedValue(Promise.resolve(response)); // followUser возвращает промисf

  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3) // 3 вызова dispatch
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
  usersAPIMock.unfollowUser.mockResolvedValue(Promise.resolve(response));

  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3) // 3 вызова dispatch
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})