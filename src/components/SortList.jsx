import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sort } from '../actions';
import styles from './FiltersList.module.css';

const SortList = () => {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState('title');
  const options = {
    title: 'По заголовку',
    author: 'По автору',
    date: 'По дате',
  };

  return (
    <fieldset className="form-group container">
      <legend className="mt-4">Сортировка</legend>
      <div className={`btn-group-vertical ${styles.filtersList}`}>
        {Object.keys(options).map((key) => {
          return (
            <button
              type="button"
              key={key}
              className={`${
                sortOption === key ? 'btn-primary' : 'btn-secondary'
              } btn btn-sm d-flex justify-content-between align-items-center`}
              onClick={() => {
                setSortOption(key);
                dispatch(sort(key));
              }}
            >
              {options[key]}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default SortList;
