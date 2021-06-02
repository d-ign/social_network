// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const messagesReducer = (state = initialState, action) => {

  // копируем только то, что планируем изменять; внутренние объекты массива (с id которые) мы менять не планируем, поэтому их копию и не делаем
  // stateCopy = 'копия state' или copy of state

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state,
    //     newMessageBody: action.body
    //   };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages, 
          { id: '6', 
          message: action.newMessageBody }
        ],
      };

    default:
      return state;
  }
};

// updateNewMessageBody (читается: обновить ТЕЛО нового сообщения) то же самое, что и "body of new message"
// больше его не надо, т.к. за состояние сообщения теперь отвечает библиотека redux-form
// export const updateNewMessageBody = (symbol) => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   body: symbol
// });
export const sendMessage = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default messagesReducer;