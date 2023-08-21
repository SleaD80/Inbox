import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TasksList from "./TasksList";
import TaskInfo from "./TaskInfo";
import data from '../data/tasks';
import ColumnResizer from "column-resizer";

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state={
        data: []
    };
    this.tableSelector = "#taskslayout";
  }

  componentDidMount() {
    this.setState({data:data});
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

  UNSAFE_componentWillUpdate() {
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
              <table id="taskslayout" style={{width:'100%'}}>
                  <tbody>
                  <tr>
                      <td style={{width:'50%'}}>
                          <div style={{height:'80vh', overflowY:'auto', overscrollBehavior:'contain'}}>
                              <TasksList tasks={this.state.data}/>
                          </div>
                      </td>
                      <td style={{textAlign:'center',width:'50%'}}>
                          <div style={{height:'80vh'}}>
                              <TaskInfo />
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      );
  }
}

export default Tasks;
