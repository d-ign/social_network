import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form';
import { Element } from '../common/FormsControls/FormsControls';
import { maxLengthCreator } from '../../utils/validators/validators';


const Dialogs = (props) => {

  let dialogsElements = props.messagesPage.dialogs.map(d =>
    <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = props.messagesPage.messages.map(m =>
    <Message key={m.key} text={m.message} />);

  const addNewMessage = (values) => {
    // newMessageBody - name у Field
    props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.messages}>
      <div className={s.items}>
        <span className={s.title}>DIALOGS</span>
        {dialogsElements}
      </div>
      <div className={s.dialogs}>
        {messagesElements}
        <DialogsReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

const maxLength30 = maxLengthCreator(30);
const Textarea = Element('textarea');

const SendMessageForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      {/* handleSubmit - метод из reduxForm, который собирает данные, вызывает preventDefault() и т.д. */}
      <Field
        name='newMessageBody'
        validate={[maxLength30]}
        placeholder='Введи сообщение'
        component={Textarea}
      />
      <button>Send</button>
    </form>
  )
}


const DialogsReduxForm = reduxForm({
  form: 'dialogAddMessageForm' // form никак не связан с form в redux-store
})(SendMessageForm);


export default Dialogs;