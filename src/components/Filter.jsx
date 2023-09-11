import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../actions';
import './Filter.css';

const Filter = (props) => {
  const { criterium, title, number } = props;
  const dispatch = useDispatch();
  const filterCriterium = useSelector((store) => store.filterCriterium);
  return (
    <li
      className={`${
        criterium === filterCriterium ? 'list-group-item-primary' : ''
      } list-group-item d-flex justify-content-between align-items-center`}
      onClick={() => {
        dispatch(applyFilter(criterium));
      }}
    >
      {title}
      <span className="badge bg-primary rounded-pill">{number}</span>
    </li>
  );
};

export default Filter;
