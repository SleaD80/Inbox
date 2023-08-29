import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import sortIcon from '../../assets/sort_icon.svg';
import { sort } from '../../actions';

export default function Sort() {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [buttonText, setButtonText] = useState('По теме');
  const toggleOpen = () => setDropdown(!dropdown);
  const buttonLabels = { author: 'По автору', title: 'По теме' };
  const itemPressed = (fieldName) => {
    setDropdown(false);
    setButtonText(buttonLabels[fieldName]);
    dispatch(sort(fieldName));
  };
  return (
    <>
      <div className="dropdown">
        <button
          onClick={toggleOpen}
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ minWidth: '105px', maxWidth: '105px', padding: '5px' }}
        >
          <img
            src={sortIcon}
            style={{ height: '20px', width: '20px', paddingRight: '5px' }}
            alt=""
          />
          {buttonText}
        </button>
        <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`}>
          <li>
            <button
              className="dropdown-item"
              onClick={() => itemPressed('author')}
            >
              Автору
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => itemPressed('title')}
            >
              Теме
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
