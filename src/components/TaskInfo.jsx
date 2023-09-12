import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { closeTask, togglePreview } from '../actions';
import previewIcon from '../assets/file-text.svg';
import './TaskInfo.css';

function TaskInfo(props) {
  const dispatch = useDispatch();
  const displayStates = { true: 'Кратко', false: 'Подробнее' };
  const [displayState, setDisplayState] = useState(false);

  useEffect(() => {
    setDisplayState(false);
  }, [props.currentTask?.id]);

  const expandCollapseBody = () => {
    setDisplayState(!displayState);
  };

  return props.currentTask ? (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.currentTask.title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.currentTask.stage}
        </h6>
        <p className="card-text">
          {' '}
          {displayState
            ? props.currentTask.body
            : props.currentTask.body.slice(0, 200) + '...'}
        </p>
        <p className="btn-link" onClick={expandCollapseBody}>
          {displayStates[displayState]}
        </p>
        <button
          className="card-link btn btn-primary btn-sm"
          disabled={props.currentTask.stage !== 'Рассмотрение'}
          onClick={() => dispatch(closeTask(props.currentTask.id, 1))}
        >
          Подписать
        </button>
        <button
          className="card-link btn btn-secondary btn-sm"
          disabled={props.currentTask.stage !== 'Рассмотрение'}
          onClick={() => dispatch(closeTask(props.currentTask.id, 2))}
        >
          Отклонить
        </button>
        <button
          className="card-link btn btn-secondary btn-sm"
          onClick={() => dispatch(togglePreview())}
        >
          <img src={previewIcon} alt="Документ"></img>
        </button>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>Ни одной задачи не выбрано</div>
  );
}

export default TaskInfo;
