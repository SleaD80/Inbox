import './Filter.css';
import { useDispatch } from 'react-redux';
import { applyFilter } from '../actions';

const Filter = (props) => {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      style={{ marginTop: '5px', width: '90%', marginLeft: '10px' }}
      onClick={() => {
        dispatch(applyFilter(props.criterium));
      }}
    >
      <span className="badge bg-primary">{props.number}</span>
      <br />
      {props.title}
    </button>
  );
};

export default Filter;
