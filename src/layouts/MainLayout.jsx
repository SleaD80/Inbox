import { Outlet } from 'react-router-dom';
import React, { Component } from 'react';

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.tableSelector = "#mainlayout";
  }

  render() {
      return (
          <div>
              <div>
                  <h1 className="fw-light" >Задачи</h1>
                  <hr />
              </div>
              <Outlet />
          </div>
      );
  }
}

export default MainLayout;
