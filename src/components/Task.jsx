import './Task.css';
import { useDispatch } from 'react-redux';
import { selectTask } from '../actions';

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
  const selectionWidth = props.active ? '3' : '0';
  const taskColor = colors[props.level];
  let styles = {
    borderLeft: `${selectionWidth}px solid green`,
    marginLeft: '5px',
  };
  return (
    <div className="d-flex task" style={styles}>
      <div
        className="col"
        role="alert"
        onClick={() => dispatch(selectTask(props.id))}
      >
        <small style={{ color: taskColor }}>{props.stage}</small>
        <h4 style={{ color: taskColor }}>{props.title}</h4>
        <small className="text-muted">Автор: {props.author}</small>
        <p>{props.body}</p>
      </div>
      <div>
        <div
          className="row h-50"
          style={{ marginTop: '15px', textAlign: 'center' }}
        >
          <div className="col-sm-8 align-items-center my-auto">
            <h3 style={{ color: taskColor }}>{date.month}</h3>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-8 align-items-center mx-auto my-auto"
            style={{ textAlign: 'center' }}
          >
            <h3 style={{ color: taskColor }}>{date.date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
