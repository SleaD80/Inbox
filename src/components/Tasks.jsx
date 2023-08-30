import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TaskInfo from './TaskInfo';
import Preview from './Preview';
import Header from './Header';
import FiltersList from './FiltersList';
import ColumnResizer from 'column-resizer';

const STAGES = { 0: 'Рассмотрение', 1: 'Подписано', 2: 'Отклонено' };
const filterFuncs = {
  all: () => true,
  active: (i) => i.stage === 0,
  approved: (i) => i.stage === 1,
  rejected: (i) => i.stage === 2,
  deadline: (i) => i.level === 'Warn',
  overdue: (i) => i.level === 'Error',
};

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
    const tasks = this.props.tasks.tasks
      .filter(filterFuncs[this.props.filterCriterium])
      .filter((task) => task.title.includes(this.props.search))
      .map((task) => {
        return { ...task, stage: this.getStage(task.stage) };
      });
    let currentTask = tasks.find((task) => task.active === 1);
    currentTask = currentTask ? currentTask : tasks[0];
    return (
      <div style={{ overflowY: 'hidden' }}>
        <Header />
        <table id="taskslayout" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '12%', verticalAlign: 'top' }}>
                <FiltersList taskNumbers={this.props.tasks} />
              </td>
              <td
                style={{
                  width: '38%',
                  verticalAlign: 'top',
                  borderRight: '1px dotted',
                  borderColor: 'grey',
                }}
              >
                <TasksList tasks={tasks} />
              </td>
              <td style={{ width: '50%' }}>
                <div
                  style={{
                    textAlign: 'left',
                    height: '35vh',
                    marginLeft: '15px',
                  }}
                >
                  <TaskInfo currentTask={currentTask} />
                </div>
                <hr />
                <div
                  style={{
                    textAlign: 'center',
                    height: '45vh',
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
  return {
    tasks: state.tasks,
    search: state.search,
    filterCriterium: state.filterCriterium,
  };
}

export default connect(mapStateToProps, {})(Tasks);
