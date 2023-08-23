import React, { Component } from "react";
import ReactDOM from "react-dom";
import TasksList from "./TasksList";
import TaskInfo from "./TaskInfo";
import Preview from "./Preview";
import Header from "./Header";
import data from "../data/tasks";
import ColumnResizer from "column-resizer";

class Tasks extends Component {
    stages = { 0: "Рассмотрение", 1: "Подписано", 2: "Отклонено" };
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentTask: null,
            sorterField: "id",
        };
        this.tableSelector = "#taskslayout";
    }

    componentDidMount() {
        this.setState({ data: data, currentTask: this.mutateState(data)[0] });
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
                ReactDOM.findDOMNode(this).querySelector(
                    `${this.tableSelector}`
                ),
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

    mutateState(data) {
        return data
            .filter((task) => task.stage === 0)
            .sort((a, b) => {
                return a[this.state.sorterField].localeCompare(
                    b[this.state.sorterField]
                );
            })
            .map((task) => {
                const newTask = Object.assign({}, task);
                newTask.stage = this.getStage(task.stage);
                return newTask;
            });
    }

    selectTask(id) {
        const tasks = this.mutateState(this.state.data);
        const currentTask =
            (tasks.length !== 0
                ? tasks.find((task) => task.id === id)
                : null) || tasks[0];
        this.setState({ currentTask: currentTask });
    }

    getStage(stageId) {
        return this.stages[stageId];
    }

    closeTask(taskId, stageId) {
        let newState = [...this.state.data];
        const ind = this.state.data.findIndex((task) => task.id === taskId);
        newState[ind].stage = stageId;
        this.setState({
            data: newState,
            currentTask: this.mutateState(newState)[0],
        });
    }

    sortItemClick(fieldName) {
        this.setState({ sorterField: fieldName }, () =>
            this.setState({ currentTask: this.mutateState(this.state.data)[0] })
        );
    }

    render() {
        const tasks = this.mutateState(this.state.data);
        return (
            <div>
                <Header sortItemClick={this.sortItemClick.bind(this)} />
                <table id="taskslayout" style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "50%" }}>
                                <div
                                    style={{
                                        height: "80vh",
                                        overflowY: "auto",
                                        overscrollBehavior: "contain",
                                    }}
                                >
                                    <TasksList
                                        tasks={tasks}
                                        selectTask={this.selectTask.bind(this)}
                                        sorterField={this.sorterField}
                                    />
                                </div>
                            </td>
                            <td style={{ width: "50%" }}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        height: "30vh",
                                    }}
                                >
                                    <TaskInfo
                                        currentTask={this.state.currentTask}
                                        closeTask={this.closeTask.bind(this)}
                                    />
                                </div>
                                <hr />
                                <div
                                    style={{
                                        textAlign: "center",
                                        height: "50vh",
                                    }}
                                >
                                    <Preview
                                        content={
                                            this.state.currentTask
                                                ? require(`../data/${this.state.currentTask.content}`)
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

export default Tasks;
