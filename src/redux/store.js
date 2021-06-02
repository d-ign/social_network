// этот файл здесь временно, чтобы подсматривать. Весь функционал реализован с помощью Redux (см. файл redux-store)

import messagesReducer from "./messages-reducer";
import profileReducer from "./profile-reducer";

// store - это менеджер
let store = {
  _state: {
    profilePage: {
      posts: [
        { id: '1', message: 'Стена Привет!', likesCount: 12 },
        { id: '2', message: 'Стена Как дела?', likesCount: 4 },
      ],

      newPostText: 'test2121',
    },

    messagesPage: {
      dialogs: [
        { id: '1', name: 'Denis' },
        { id: '2', name: 'Andrey' },
        { id: '3', name: 'Alexandr' },
        { id: '4', name: 'Alisa' },
      ],

      messages: [
        { id: '1', message: 'Hi!' },
        { id: '2', message: 'lalalalalalala' },
        { id: '3', message: 'How are you?' },
      ],

      newMessageBody: 'sdsdsd',

    },

  },

  _callSubscriber() {
    // console.log('lalala');
  },


  getState() {
    return this._state;
  },
  // _callSubscriber нужна чтобы перерисовывать страницу после каждого изменения в state, а не только первый раз
  subscribe(observer) {
    // приходит в виде observer реальный rerenderEntireTree
    this._callSubscriber = observer;
  },


  // универсальный метод, который будут дёргать все; action - объект с обязательным свойством type и с другими индивидуальными свойствами
  dispatch(action) {

    // новый profilePage после reducer присваивается profilePage текущему
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

    this._callSubscriber(this._state);
  },
};




window.store = store;
export default store;