// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'Denis' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Alexandr' },
    { id: 4, name: 'Alisa' },
  ] as Array<DialogType>,

  messages: [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'lalalalalalala' },
    { id: 3, message: 'How are you?' },
  ] as Array<MessageType>,

  newMessageText: ''
};

type InitialStateType = typeof initialState;

const messagesReducer = (state = initialState, action: any): InitialStateType => {

  // копируем только то, что планируем изменять; внутренние объекты массива (с id которые) мы менять не планируем, поэтому их копию и не делаем
  // stateCopy = 'копия state' или copy of state

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state,
    //     newMessageBody: action.body
    //   };

    case SEND_MESSAGE:
      let newMessage = { 
        id: 6,
        message: action.newMessageText
      };
      return {
        ...state,
        messages: [newMessage, ...state.messages],
        newMessageText: ''
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
type SendMessageType = {
  type: typeof SEND_MESSAGE
  newMessageText: string
}
export const sendMessage = (newMessageText: string): SendMessageType => ({ type: SEND_MESSAGE, newMessageText });

export default messagesReducer;