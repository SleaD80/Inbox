import React, { Component } from 'react';
import Search from './UI/Search';

class Header extends Component {
  render() {
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
                <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Темы
                </button>
                <div className="dropdown-menu ">
                  <button
                    data-theme="materia"
                    className="dropdown-item theme-link"
                  >
                    Materia
                  </button>
                  <button
                    data-theme="slate"
                    className="dropdown-item theme-link"
                  >
                    Slate
                  </button>
                  <button
                    data-theme="cerulean"
                    className="dropdown-item theme-link"
                  >
                    Cerulean
                  </button>
                </div>
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
}

export default Header;
