import React, { Component } from 'react';

class TaskInfo extends Component {

  render() {
    this.tasks = this.props.tasks.filter((task) => task.stage === 0)
    this.currentTask = (this.tasks.length !== 0 ? this.tasks.find(task => task.id === this.props.currentTask) : null) || this.tasks[0];
    this.stage=this.currentTask ? this.props.getStage(this.currentTask.stage) : null;
    return (
            this.currentTask ?
                <div>
                    <div style={{marginBottom:'20px'}}>
                        <div style={{float:'left',width:'88%'}}>
                            <b>{this.currentTask.title}</b>
                        </div>
                        <div>
                            <span className="badge bg-secondary">{this.stage}</span>
                        </div>
                        {this.currentTask.body}
                    </div>
                    <div>
                        <button onClick={() => this.props.closeTask(this.currentTask.id, 1)}
                                type="button" className="button btn-success" style={{width:'40%',marginRight:'18%'}}>Подписать</button>
                        <button onClick={() => this.props.closeTask(this.currentTask.id, 2)}
                                type="button" className="button btn-success" style={{width:'40%'}}>Отклонить</button>
                    </div>
                </div>
            :
            null
    );
  }
}

export default TaskInfo;
