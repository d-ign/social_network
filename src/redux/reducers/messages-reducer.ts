import { DialogType, MessageType } from "../../types/types";
import { InferActionsTypes } from "../redux-store";

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

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  // копируем только то, что планируем изменять; внутренние объекты массива (с id которые) мы менять не планируем, поэтому их копию и не делаем
  // stateCopy = 'копия state' или copy of state

  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state,
    //     newMessageText: action.body
    //   };

    case 'SEND_MESSAGE':
      let newMessage = {
        id: 4,
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

export const actions = {
  sendMessage: (newMessageText: string) => ({ type: 'SEND_MESSAGE', newMessageText } as const),
}

export default messagesReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;