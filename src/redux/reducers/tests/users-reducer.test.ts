import usersReducer, { actions, InitialStateType } from '../users-reducer';

let state: InitialStateType;

// state будет создаваться для каждого теста заново, чтобы изменение состояния тестами не влияло на другие тесты
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Den_0',
        followed: false,
        photos: { small: null, large: null },
        status: 'status_0'
      },
      {
        id: 1,
        name: 'Den_1',
        followed: false,
        photos: { small: null, large: null },
        status: 'status_1'
      },
      {
        id: 2,
        name: 'Den_2',
        followed: true,
        photos: { small: null, large: null },
        status: 'status_2'
      },
      {
        id: 3,
        name: 'Den_3',
        followed: true,
        photos: { small: null, large: null },
        status: 'status_3'
      },
    ],

    pageSize: 50,
    totalUsersCount: 0,

    isFetching: true,
    followingInProgress: [],
  }
})


test('follow success', () => {

  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy() // то, что не должно поменяться и не поменялось
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy() // то, что не должно поменяться и не поменялось
  expect(newState.users[3].followed).toBeFalsy()
})