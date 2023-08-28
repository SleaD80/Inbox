import { useDispatch } from 'react-redux';
import { closeTask } from '../actions';

function TaskInfo(props) {
  const dispatch = useDispatch();

  return props.currentTask ? (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ float: 'left', marginRight: '15px' }}>
          <b>{props.currentTask.title}</b>
        </div>
        <div>
          <span className="badge bg-secondary">{props.currentTask.stage}</span>
        </div>
        <hr />
        {props.currentTask.body}
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
