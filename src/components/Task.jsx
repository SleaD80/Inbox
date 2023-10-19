import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { selectTask } from '../actions';
import Icon from './Icon';
import styles from './Task.module.css';
import { getDate } from '../helpers';
import { IconTypes } from '../consts/consts';

function Task(props) {
  const date = getDate(props.dateSent);
  const dispatch = useDispatch();
  const isError = props.level === 'Error';
  const theme = useSelector((store) => store.theme);
  const activeClass = props.active ? 'border-primary active' : 'border-secondary';
  const offsetClass = theme === 'target' ? null : 'mb-2';

  return (
    <div
      className={cn(activeClass, offsetClass, isError && 'error' ,'card')}
      style={{ cursor: 'pointer' }}
      onClick={() => dispatch(selectTask(props.id))}
    >
      <div className='card-header d-flex justify-content-between'>
        {props.stage}
        <h5 className={cn('m-0 p-0', isError && styles.date_error)}>{`${date.date} ${date.month}`}</h5>
      </div>
      <div className="d-flex card-body">
        <div className="col">
          <h4 className="card-title">{props.title}</h4>
          <p className={cn('card-text', styles.pCut)}>{props.body}</p>
        </div>
        {isError && <div className={styles.urgently_icon}>
          <Icon name={IconTypes.Schedule} color='var(--color-light)' size='s'/>
        </div>}
      </div>
    </div>
  );
}

export default Task;
