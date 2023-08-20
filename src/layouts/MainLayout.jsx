import { Outlet } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ColumnResizer from "column-resizer";

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.tableSelector = "#mainlayout";
  }

  componentDidMount() {
    if (this.props.resizable) {
      this.enableResize();
    }
  }

  componentWillUnmount() {
    if (this.props.resizable) {
      this.disableResize();
    }
  }

  componentDidUpdate() {
    if (this.props.resizable) {
      this.enableResize();
    }
  }

  componentWillUpdate() {
    if (this.props.resizable) {
      this.disableResize();
    }
  }

  enableResize() {
    const options = this.props.resizerOptions;
    if (!this.resizer) {
      this.resizer = new ColumnResizer(
        ReactDOM.findDOMNode(this).querySelector(`${this.tableSelector}`),
        options
      );
    } else {
      this.resizer.reset(options);
    }
  }

  disableResize() {
    if (this.resizer) {
      this.resizer.reset({ disable: true });
    }
  }

  render() {
      return (
          <div>
              <div>
                  <h1 className="fw-light" >Задачи</h1>
                  <hr />
              </div>
              <table id="mainlayout" style={{width:'100%'}}>
                  <tr>
                      <td style={{width:'50%'}}>
                          <div style={{height:'80vh', overflowY:'auto', overscrollBehavior:'contain'}}>
                              <Outlet />
                          </div>
                      </td>
                      <td style={{textAlign:'center',width:'50%'}}>
                          <div style={{height:'80vh'}}>Under construction</div>
                      </td>
                  </tr>
              </table>
          </div>
      );
  }
}

export default MainLayout;
