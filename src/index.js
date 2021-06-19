import React from 'react';
import ReactDOM from 'react-dom'; // вместо ReactDOM можно использовать React Native и превратить реакт-компоненты и js в java-код для андроида и айфона
import SamuraiJSApp from './App';
import './index.css';


// убрали rerenderEntireTree потому что у функции connect усть внутренний свой subscribe
// let rerenderEntireTree = (state) => {

// Provider - компонента из библиотеки react-redux, использующая context API
// <React.StrictMode> здесь был Provider и App</React.StrictMode> - убрал, т.к. на странице users два раза отрисовывал пользователей (вместо 2х - четыре), сделал на 49-ом уроке
ReactDOM.render(<SamuraiJSApp />, document.getElementById('root'));

// первичная отрисовка страницы
// rerenderEntireTree(store.getState());

// передали rerenderEntireTree функции в state.js, т.е. создаём callback
// redux при вызове reduсers не передаёт им обновлённый state, поэтому store.subscribe(rerenderEntireTree); заменяем на:
// store.subscribe(() => {
//   let state = store.getState();
//   rerenderEntireTree(state);
// });