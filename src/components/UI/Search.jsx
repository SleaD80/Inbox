import { useDispatch } from 'react-redux';
import { search } from '../../actions';
import './Search.css';

function Search() {
  const dispatch = useDispatch();

  return (
    <input
      type="search"
      className="form-control bg-light"
      placeholder="Поиск"
      onChange={(e) => dispatch(search(e.target.value))}
    />
  );
}

export default Search;
