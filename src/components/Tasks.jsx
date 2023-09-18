import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TaskInfo from './TaskInfo';
import Preview from './Preview';
import Header from './Header';
import FiltersList from './FiltersList';
import gripVerticalIcon from '../assets/grip-vertical.svg';
import previewIcon from '../assets/file-text.svg';

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
      displayPreview: false,
      rightPanelWidth: 0,
    };
    this.tableSelector = '#taskslayout';
  }

  getStage(stageId) {
    return STAGES[stageId];
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
          <div id="tasklistPanel">
            <TasksList tasks={tasks} />
          </div>
          <div id="rightPanel" className="container">
            {currentTask ? (
              <>
                <div id="taskInfo">
                  <TaskInfo
                    currentTask={currentTask}
                    displayPreview={() => this.displayPreview.bind(this)}
                  />
                </div>
                <hr />
                <div id="previewPanel">
                  {this.props.displayPreview ? (
                    <Preview
                      togglePreview={() => this.togglePreview.bind(this)}
                      status={this.state.previewExpanded}
                      content={
                        currentTask
                          ? currentTask.content.map((item) =>
                              require(`../data/${item}`)
                            )
                          : null
                      }
                    />
                  ) : (
                    <div>
                      Нажмите <img src={previewIcon} alt=""></img> для
                      отображения предпросмотра документа
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>Выберите задачу</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    search: state.search,
    filterCriterium: state.filterCriterium,
    previewExpanded: state.togglePreview,
    displayPreview: state.displayPreview,
  };
}

export default connect(mapStateToProps, {})(Tasks);
