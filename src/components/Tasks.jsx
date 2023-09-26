import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TaskInfo from './TaskInfo';
import Header from './Header';
import FiltersList from './FiltersList';
import SortList from './SortList';
import Snackbar from './Snackbar';
import gripVerticalIcon from '../assets/grip-vertical.svg';

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
      rightPanelWidth: 0,
    };
    this.tableSelector = '#taskslayout';
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
    if (!currentTask && tasks.length > 0) {
      tasks[0].active = 1;
      currentTask = tasks[0];
    }
    return (
      <>
        <Header />
        <div className="d-flex">
          <div id="filtersPanel">
            <FiltersList taskNumbers={this.props.tasks} />
            <SortList />
          </div>
          <div
            style={{ maxWidth: '20px', minWidth: '20px', cursor: 'pointer' }}
            onClick={() => {
              document.getElementById('filtersPanel').style.display = this.state
                .filtersCollapsed
                ? 'block'
                : 'none';
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
                position: 'absolute',
                top: '50%',
              }}
              alt=""
            />
          </div>
          <div id="tasklistPanel" className="container col-4">
            <TasksList tasks={tasks} />
          </div>
          <div id="rightPanel" className="container">
            {currentTask ? (
              <div id="taskInfo">
                <TaskInfo currentTask={currentTask} />
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>Выберите задачу</div>
            )}
          </div>
        </div>
        {this.props.snackbarState ? <Snackbar /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    search: state.search,
    filterCriterium: state.filterCriterium,
    snackbarState: state.snackbar.show,
  };
}

export default connect(mapStateToProps, {})(Tasks);
