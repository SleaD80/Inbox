import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TaskInfo from './TaskInfo';
import Preview from './Preview';
import Header from './Header';
import FiltersList from './FiltersList';
import gripVerticalIcon from '../assets/grip-vertical.svg';
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
    this.state = {
      filtersCollapsed: false,
      previewExpanded: false,
      rightPanelWidth: 0,
    };
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

  getPercentWidth(elId) {
    const el = document.getElementById(elId);
    const parent = el.offsetParent || el;
    return ((el.offsetWidth / parent.offsetWidth) * 100).toFixed(2);
  }

  togglePreview() {
    let filtersPanel = document.getElementById('filtersPanel');
    let tasklistPanel = document.getElementById('tasklistPanel');
    let taskinfoPanel = document.getElementById('taskInfo');
    let previewPanel = document.getElementById('previewPanel');
    let rightPanel = document.getElementById('rightPanel');
    if (!this.state.previewExpanded) {
      this.setState({ rightPanelWidth: rightPanel.style.width }, () => {
        filtersPanel.hidden = true;
        tasklistPanel.hidden = true;
        taskinfoPanel.hidden = true;
        previewPanel.style.height = '80vh';
      });
    } else {
      filtersPanel.hidden = false;
      tasklistPanel.hidden = false;
      taskinfoPanel.hidden = false;
      previewPanel.style.height = '45vh';
      rightPanel.style.width = this.state.rightPanelWidth;
    }
    this.setState({ previewExpanded: !this.state.previewExpanded });
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
              <td
                style={{ width: '12%', minWidth: '12%', verticalAlign: 'top' }}
                id="filtersPanel"
              >
                <div>
                  <FiltersList taskNumbers={this.props.tasks} />
                </div>
              </td>
              <td style={{ width: '20px', cursor: 'pointer' }}>
                <div
                  style={{ maxWidth: '20px', minWidth: '20px' }}
                  onClick={() => {
                    let filtersPanel = document.getElementById('filtersPanel');
                    let tasklistPanel =
                      document.getElementById('tasklistPanel');
                    if (this.state.filtersCollapsed) {
                      filtersPanel.style.width = '12%';
                      tasklistPanel.style.width =
                        (
                          100 -
                          this.getPercentWidth('rightPanel') -
                          12
                        ).toString() + '%';
                    } else {
                      filtersPanel.style.width = '0%';
                    }
                    this.setState({
                      filtersCollapsed: !this.state.filtersCollapsed,
                    });
                  }}
                >
                  <img
                    src={gripVerticalIcon}
                    style={{
                      height: '35px',
                      width: '20px',
                    }}
                    alt=""
                  />
                </div>
              </td>
              <td
                id="tasklistPanel"
                style={{
                  width: '38%',
                  verticalAlign: 'top',
                  borderRight: '1px dotted',
                  borderColor: 'grey',
                }}
              >
                <TasksList tasks={tasks} />
              </td>
              <td id="rightPanel" style={{ width: '50%' }}>
                <div
                  id="taskInfo"
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
                  id="previewPanel"
                  style={{
                    textAlign: 'center',
                    height: '45vh',
                  }}
                >
                  <Preview
                    togglePreview={() => this.togglePreview.bind(this)}
                    status={this.state.previewExpanded}
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
    previewExpanded: state.togglePreview,
  };
}

export default connect(mapStateToProps, {})(Tasks);
