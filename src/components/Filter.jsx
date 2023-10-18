import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../actions';

const Filter = (props) => {
  const { criterium, title, number, icon } = props;
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
      <div className='d-flex align-items-center'>
        {icon && <span className='me-2'>{icon}</span>}
        {title}
      </div>
      <span className={`badge ${criterium === filterCriterium ? 'bg-primary' : 'bg-secondary'}`}>{number}</span>
    </button>
  );
};

export default Filter;
