import { useDispatch } from 'react-redux';
import { search } from '../../actions';

function Search() {
  const dispatch = useDispatch();

  return (
    <div className="input-group" style={{ padding: '15px' }}>
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-label=""
        aria-describedby="basic-addon1"
        onChange={(e) => dispatch(search(e.target.value))}
      />
      <div className="input-group-append">
        <span className="input-group-text">Search</span>
      </div>
    </div>
  );
}

export default Search;
