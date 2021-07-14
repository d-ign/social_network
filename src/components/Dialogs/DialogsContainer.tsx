import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/reducers/messages-reducer';
import withAuthRedirect from '../hoc/withAuthRedirect';

import Dialogs from './Dialogs';

import { AppStateType } from '../../redux/redux-store';
import { DialogType, MessageType } from '../../types/types';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
  }
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapStateToProps,
    {
      sendMessage: actions.sendMessage,
    }
  ),
  withAuthRedirect
)(Dialogs)


export type MapStatePropsType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
}

export type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void
}