import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../actions';

const Filter = (props) => {
  const { criterium, title, number } = props;
  const dispatch = useDispatch();
  const filterCriterium = useSelector((store) => store.filterCriterium);
  return (
    <button
      type="button"
      className={`${
        criterium === filterCriterium ? 'btn-primary' : 'btn-secondary'
      } btn btn-sm d-flex justify-content-between align-items-center`}
      onClick={() => {
        dispatch(applyFilter(criterium));
      }}
    >
      {title}
      <span className="badge bg-primary rounded-pill">{number}</span>
    </button>
  );
};

export default Filter;
