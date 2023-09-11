import React, { Component } from 'react';
import Search from './UI/Search';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand">Меню</span>
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
              <li className="nav-item">
                <button className="nav-link active">
                  Задачи
                  <span className="visually-hidden">(current)</span>
                </button>
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
