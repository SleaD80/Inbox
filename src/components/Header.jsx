//import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import Search from './UI/Search';
import Dropdown from './UI/Dropdown';
import { changeTheme } from '../actions';

function Header() {
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <span className="navbar-brand">Задачи</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <Dropdown
                id="theme-selector"
                label="Темы"
                options={[
                  {
                    id: 'materia',
                    label: 'Materia',
                    handleClick: () => dispatch(changeTheme('materia')),
                  },
                  {
                    id: 'slate',
                    label: 'Slate',
                    handleClick: () => dispatch(changeTheme('slate')),
                  },
                  {
                    id: 'cerulean',
                    label: 'Cerulean',
                    handleClick: () => dispatch(changeTheme('cerulean')),
                  },
                ]}
              />
            </li>
          </ul>
          <form className="d-flex">
            <Search />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
