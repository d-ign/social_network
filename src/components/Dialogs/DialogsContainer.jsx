// import React from 'react';
import { sendMessage } from '../../redux/messages-reducer';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  }
};

// создание контейнерной компоненты с помощью библиотеки react-redux
// всего лишь обернув withAuthRedirect -ом презентационную компоненту мы создаём редирект
// export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs));
// или так
// export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));
// или так
export default compose(
  connect(mapStateToProps, {
    sendMessage,
  }),
  withAuthRedirect
)(Dialogs)