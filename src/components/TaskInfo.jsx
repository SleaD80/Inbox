import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { closeTask } from '../actions';

function TaskInfo(props) {
  const dispatch = useDispatch();
  const displayStates = { true: 'Кратко', false: 'Подробнее' };
  const [displayState, setDisplayState] = useState(false);
  useEffect(
    () => setDisplayState(false),
    [props.currentTask ? props.currentTask.id : 0]
  );

  const expandCollapseBody = () => {
    setDisplayState(!displayState);
  };

  return props.currentTask ? (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ float: 'left', marginRight: '15px' }}>
          <b>{props.currentTask.title}</b>
        </div>
        <div>
          <span className="badge bg-secondary">{props.currentTask.stage}</span>
        </div>
        <div>
          {displayState
            ? props.currentTask.body
            : props.currentTask.body.slice(0, 200) + '...'}
        </div>
      </div>
      <div style={{ color: 'blue' }} onClick={expandCollapseBody}>
        {displayStates[displayState]}
      </div>
      <div>
        <button
          onClick={() => dispatch(closeTask(props.currentTask.id, 1))}
          type="button"
          className="button btn-success rounded"
          style={{ width: '40%', marginRight: '18%' }}
        >
          Подписать
        </button>
        <button
          onClick={() => dispatch(closeTask(props.currentTask.id, 2))}
          type="button"
          className="button btn-success rounded"
          style={{ width: '40%' }}
        >
          Отклонить
        </button>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>Ни одной задачи не выбрано</div>
  );
}

export default TaskInfo;
