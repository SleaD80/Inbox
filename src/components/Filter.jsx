import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../actions';
import Icon from './Icon';

const Filter = (props) => {
  const { criterium, title, number, icon } = props;
  const dispatch = useDispatch();
  const filterCriterium = useSelector((store) => store.filterCriterium);

  const renderIconComponent = (name) => <Icon name={name} color='var(--color-stroke)' externalClass='me-2'/>

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
        {icon && renderIconComponent(icon)}
        {title}
      </div>
      <span className={`badge ${criterium === filterCriterium ? 'bg-primary' : 'bg-secondary'}`}>{number}</span>
    </button>
  );
};

export default Filter;
