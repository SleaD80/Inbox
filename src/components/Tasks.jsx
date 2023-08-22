import React, { Component } from "react";
import ReactDOM from "react-dom";
import TasksList from "./TasksList";
import TaskInfo from "./TaskInfo";
import Preview from "./Preview";
import Header from "./Header";
import data from "../data/tasks";
import ColumnResizer from "column-resizer";

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentTask: 1,
            sorterField: "id",
        };
        this.tableSelector = "#taskslayout";
    }

    componentDidMount() {
        this.setState({ data: data });
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

    selectTask(id) {
        this.setState({ currentTask: id });
    }

    getStage(stageId) {
        const stages = { 0: "Рассмотрение", 1: "Подписано", 2: "Отклонено" };
        return stages[stageId];
    }

    closeTask(taskId, stageId) {
        let prevState = [...this.state.data];
        const ind = this.state.data.findIndex((task) => task.id === taskId);
        prevState[ind].stage = stageId;
        this.setState({ data: prevState });
    }

    sortItemClick(fieldName) {
        this.setState({ sorterField: fieldName });
        console.log(fieldName + " clicked");
    }

    render() {
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
                                        tasks={this.state.data
                                            .filter((task) => task.stage === 0)
                                            .sort(
                                                (a, b) =>
                                                    a[this.state.sorterField] >
                                                    b[this.state.sorterField]
                                            )}
                                        selectTask={this.selectTask.bind(this)}
                                        getStage={this.getStage}
                                        sorterField={this.sorterField}
                                    />
                                </div>
                            </td>
                            <td style={{ width: "50%" }}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        height: "40vh",
                                    }}
                                >
                                    <TaskInfo
                                        tasks={this.state.data}
                                        currentTask={this.state.currentTask}
                                        getStage={this.getStage}
                                        closeTask={this.closeTask.bind(this)}
                                    />
                                </div>
                                <hr />
                                <div
                                    style={{
                                        textAlign: "center",
                                        height: "40vh",
                                    }}
                                >
                                    <Preview />
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
