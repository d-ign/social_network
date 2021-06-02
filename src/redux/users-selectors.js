// Селекторы - это функции, возращающие конкретный объект данных из кучи BLL. Плюс их использования в том, что можно поменять что-то здесь в селекторе и изменить это во многих местах, где эти функции-селекторы вызываются. 

// Проблемы селекторов: 
// 1. Вычисления (в том числе и тяжёлые) выполняются каждый раз как изменяется состояние (результат вычислений не кэшируется), 
// 2. Лишние перерисовки компоненты из-за создания новых одинаковых объектов (объекты с одними и теми же значениями не равны друг другу), 
// 3. Сложно дебажить, т.к. при каждой перерисовке попадаешь в один и тот же селектор. 

// Но с помощью библиотеки reselect можно решить эти проблемы. И если вычисления тяжёлые, то использовать данную библиотеку имеет смысл. Данные будут сохранятьсяв кэше.Простые селекторы по прежнему создаём руками. Библиотека создаёт сложные селекторы, используя результаты вычислений простых примитивных селекторов. Также они могут состоять их таких же сложных селекторов + примитивных. Простые селекторы - это ЗАВИСИМОСТИ для сложного селектора, и он будет перерисовывать компоненту только когда реально изменится одна из таких зависимостей.

// import { createSelector } from "reselect";

// это примитивные селектор, который возвращает конкретный массив данных
// const primitiveSelector = (state) => {
//   return state.usersPage.users
// };

// это селектор от reselect, использующий результат примитивного селектора и выполняющий сложную логику. reselct сама вызовет (если что-то изменится в них) функции primitiveSelector и getIsFetching и потом перерисует компоненту (а рендер трудозатратен), которая зависит от результата работы superPuperSelector
// export const superPuperSelector = createSelector(
//   primitiveSelector, getIsFetching, (users, isFetching) => {
//     return users.filter(u => true) = сложная логика
// })





export const getUsersSelector = (state) => {
  return state.usersPage.users
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}; 

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}; 

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress
};