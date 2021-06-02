import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false); // режима редактирования статуса по умолчанию выключен
  let [status, setStatus] = useState(props.status); // status и editMode меняются независимо друг от друга, поэтому они раздельно записаны

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true) // меняем span на input
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status); // синхронизация локального состояния с "глобальным" (на сервере)
  }

  const handleFocus = (event) => {
    event.target.select(); // выделяем весь текст при входе в "режим редактирования"
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value) // меняем локальное состояние
  }

  return <>
    {
      editMode
        ? <input
          autoFocus
          onFocus={handleFocus}

          onChange={onStatusChange}
          onBlur={deactivateEditMode}

          value={status} />
        : <span
          onClick={activateEditMode}>{props.status}</span> // в props.status увидим после редактирования статуса с задержкой новый статус, когда он обновится на сервере
    }
  </>
}

ProfileStatus.propTypes = {
  updateStatus: PropTypes.func.isRequired, // isReauired = функция необходима для работы данного компонента; если не будет передан, то выйдет предупреждение
  // test: PropTypes.arrayOf(PropTypes.object) --> массив из объектов (см. все варианты в файле)
}

export default ProfileStatusWithHooks;