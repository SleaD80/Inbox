import Tasks from "./components/Tasks";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTasks } from "./actions";

class App extends Component {
    async componentDidMount() {
        await this.props.fetchTasks();
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route
                            path="tasks"
                            element={
                                <Tasks
                                    resizable={true}
                                    resizerOptions={{ minWidth: 300 }}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        );
    }
}
export default connect(null, { fetchTasks })(App);
