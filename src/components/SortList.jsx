import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sort } from '../actions';

const SortList = () => {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState('title');
  const options = {
    title: 'По заголовку',
    author: 'По автору',
    date: 'По дате',
  };

  return (
    <fieldset className="form-group">
      <legend className="mt-4 container">Сортировка</legend>
      <ul className="list-group">
        {Object.keys(options).map((key) => {
          return (
            <li
              key={key}
              className={`${
                sortOption === key ? 'list-group-item-primary' : ''
              } list-group-item d-flex justify-content-between align-items-center`}
              onClick={() => {
                setSortOption(key);
                dispatch(sort(key));
              }}
            >
              {options[key]}
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

export default SortList;
