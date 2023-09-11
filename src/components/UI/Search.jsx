import { useDispatch } from 'react-redux';
import { search } from '../../actions';
import './Search.css';

function Search() {
  const dispatch = useDispatch();

  return (
    <div className="task-container">
      <input
        type="search"
        className="form-control"
        placeholder="Поиск"
        onChange={(e) => dispatch(search(e.target.value))}
      />
    </div>
  );
}

export default Search;
