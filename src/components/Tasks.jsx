import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TaskInfo from './TaskInfo';
import Preview from './Preview';
import Header from './Header';
import ColumnResizer from 'column-resizer';

const STAGES = { 0: 'Рассмотрение', 1: 'Подписано', 2: 'Отклонено' };

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.tableSelector = '#taskslayout';
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

  getStage(stageId) {
    return STAGES[stageId];
  }

  render() {
    const tasks = this.props.tasks
      .filter((task) => task.stage === 0)
      .filter((task) => task.title.includes(this.props.search))
      .map((task) => {
        return { ...task, stage: this.getStage(task.stage) };
      });
    let currentTask = tasks.find((task) => task.active === 1);
    if (!currentTask) {
      if (tasks.length > 0) {
        tasks[0].active = 1;
        currentTask = tasks[0];
      }
    }
    return (
      <div>
        <Header />
        <table id="taskslayout" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%' }}>
                <TasksList tasks={tasks} />
              </td>
              <td style={{ width: '50%' }}>
                <div
                  style={{
                    textAlign: 'left',
                    height: '30vh',
                  }}
                >
                  <TaskInfo currentTask={currentTask} />
                </div>
                <hr />
                <div
                  style={{
                    textAlign: 'center',
                    height: '50vh',
                  }}
                >
                  <Preview
                    content={
                      currentTask
                        ? require(`../data/${currentTask.content}`)
                        : null
                    }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks, search: state.search };
}

export default connect(mapStateToProps, {})(Tasks);
