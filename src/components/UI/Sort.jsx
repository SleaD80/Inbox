import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import sortIcon from '../../assets/sort_icon.svg';
import { sort } from '../../actions';
import './Sort.css';

export default function Sort() {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [buttonText, setButtonText] = useState('По теме');
  const toggleOpen = () => setDropdown(!dropdown);
  const buttonLabels = {
    author: 'По автору',
    title: 'По теме',
    date: 'По дате',
  };
  const itemPressed = (fieldName) => {
    setDropdown(false);
    setButtonText(buttonLabels[fieldName]);
    dispatch(sort(fieldName));
  };
  return (
    <div className="nav nav-pills dropdown">
      <button
        onClick={toggleOpen}
        className="nav-link dropdown-toggle show"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img src={sortIcon} alt="" />
        {buttonText}
      </button>
      <div
        className={`dropdown-menu ${dropdown ? 'show' : ''}`}
        data-popper-placement="bottom-start"
      >
        <button className="dropdown-item" onClick={() => itemPressed('author')}>
          Автору
        </button>
        <button className="dropdown-item" onClick={() => itemPressed('title')}>
          Теме
        </button>
        <button className="dropdown-item" onClick={() => itemPressed('date')}>
          Дате
        </button>
      </div>
    </div>
  );
}
