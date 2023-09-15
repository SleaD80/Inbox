import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sort } from '../../actions';
import sortIcon from '../../assets/sort_icon.svg';
import Dropdown from './Dropdown';
import styles from './Sort.module.css';

export default function Sort() {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState('По теме');
  const itemPressed = ({ id, label }) => {
    setButtonText(label);
    dispatch(sort(id));
  };
  const options = [
    {
      id: 'author',
      label: 'По автору',
    },
    {
      id: 'title',
      label: 'По заголовку',
    },
    { id: 'date', label: 'По дате' },
  ];

  return (
    <>
      <img src={sortIcon} alt="" className={styles.sortIcon} />
      <Dropdown
        style={{ display: 'inline-block' }}
        label={buttonText}
        options={options.map((option) => ({
          ...option,
          handleClick: () => itemPressed(option),
        }))}
      />
    </>
  );
}
