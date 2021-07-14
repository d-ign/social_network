import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import s from './Dialogs.module.css';
import renderTextField from '../common/ElementCustom/renderTextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import { MapDispatchPropsType, MapStatePropsType } from './DialogsContainer';

const Dialogs: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  let dialogsElements = props.dialogs.map(d =>
    <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = props.messages.map(m =>
    <Message key={m.id} text={m.message} />);

  const addNewMessage = (values: NewMessageValuesType) => {
    props.sendMessage(values.newMessageText) // newMessageText - name у Field
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

const SendMessageForm: React.FC<InjectedFormProps<NewMessageValuesType>> = (
  { handleSubmit }) => {
  return <form onSubmit={handleSubmit}>
    <div className={s.wrapSendAndButton}>
      <Field
        component={renderTextField}
        name='newMessageText'
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

type NewMessageValuesType = {
  newMessageText: string
}

const DialogsReduxForm = reduxForm<NewMessageValuesType>({
  form: 'dialogAddMessageForm'
})(SendMessageForm);

export default Dialogs;