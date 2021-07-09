import React from 'react';
import { Field, reduxForm } from 'redux-form';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import s from './Dialogs.module.css';
import renderTextField from '../../components/common/ElementCustom/renderTextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const Dialogs = (props) => {

  let dialogsElements = props.messagesPage.dialogs.map(d =>
    <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = props.messagesPage.messages.map(m =>
    <Message key={m.id} text={m.message} />);

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody) // newMessageBody - name у Field
  }

  return <div className={s.containerMain}>

    <div className={s.container}>
      <div className={s.items}>
        {dialogsElements}
      </div>

      <div className={s.dialogs}>
        {messagesElements}
        <DialogsReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  </div>
}

const SendMessageForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
      <div className={s.wrapSendAndButton}>
        <Field
          component={renderTextField}
          name='newMessageBody'
          placeholder='Enter your message...'
          multiline={true}
          fullWidth={true}
          variant="outlined"
          inputProps={{ maxLength: 1000 }}
        />
        <Button
          type='submit'
          variant="contained"
          color='primary'
          style={{ color: 'white', marginLeft: '10px' }}
          endIcon={<SendIcon />}
        >Send</Button>
      </div>
    </form>
}

const DialogsReduxForm = reduxForm({
  form: 'dialogAddMessageForm'
})(SendMessageForm);

export default Dialogs;