import { useDispatch } from 'react-redux';
import { selectTask } from '../actions';
import styles from './Task.module.css';

const months = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

const getDate = (timestamp) => {
  const currentDate = new Date(timestamp);
  return { month: months[currentDate.getMonth()], date: currentDate.getDate() };
};

const colors = { Ok: 'black', Warn: 'orange', Error: 'red' };

function Task(props) {
  const date = getDate(props.date);
  const dispatch = useDispatch();
  const taskColor = colors[props.level];
  return (
    <div
      className={`${
        props.active ? 'border-primary' : 'border-secondary'
      } card mb-3`}
      style={{ maxWidth: '30rem' }}
      onClick={() => dispatch(selectTask(props.id))}
    >
      <div className="card-header">{props.stage}</div>
      <div className="d-flex card-body">
        <div className="col">
          <h4 className="card-title">{props.title}</h4>
          <small className="text-muted">Автор: {props.author}</small>
          <p className={`card-text ${styles.pCut}`}>{props.body}</p>
        </div>
        <div className={styles.dateBlock}>
          <div>
            <h5 style={{ color: taskColor }}>{`${date.month} ${date.date}`}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
