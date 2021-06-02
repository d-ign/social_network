import React from 'react';
import PropTypes from 'prop-types';

class ProfileStatus extends React.Component {

  state = {
    // режима редактирования статуса по умолчанию выключен
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true // меняем span на input
    })

    // this.state.editMode = true +
    // this.forceUpdate() - хак, который перерисует UI, но лучше его избегать
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status); // синхронизация локального состояния с "глобальным" (на сервере)
  }

  handleFocus = (event) => {
    event.target.select(); // выделяем весь текст при входе в "режим редактирования"
  }

  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value }) // меняем локальное состояние
    // this.setState({ status: e.target.value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) { // если предыдущий статус (локальный, он равен изначально '' из profileReducerr) !== статусу из пропсов
      this.setState({
        status: this.props.status // то обновить его
      })
    }
  }

  render() {
    return (
      <>
        {
          this.state.editMode
            ? <input
              autoFocus
              onFocus={this.handleFocus}

              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              
              value={this.state.status} />
            : <span
              onClick={this.activateEditMode}>{this.props.status}</span> // в this.props.status увидим после редактирования статуса с задержкой новый статус, когда он обновится на сервере
        }
      </>
    )
  }

}

ProfileStatus.propTypes = {
  updateStatus: PropTypes.func.isRequired, // isReauired = функция необходима для работы данного компонента; если не будет передан, то выйдет предупреждение
  // test: PropTypes.arrayOf(PropTypes.object) --> массив из объектов (см. все варианты в файле)
}

export default ProfileStatus;