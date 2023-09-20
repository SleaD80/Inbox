import Tasks from './components/Tasks';
import RequireAuth from './components/RequireAuth';
import ThemeProvider from './components/ThemeProvider';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Login from './layouts/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, restoreSession } from './actions';

class App extends Component {
  async componentDidMount() {
    await this.props.fetchTasks();
  }

  UNSAFE_componentWillMount() {
    this.props.restoreSession();
  }

  render() {
    return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="/app" element={<MainLayout />}>
                <Route path="tasks" element={<Tasks />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
export default connect(null, { fetchTasks, restoreSession })(App);
