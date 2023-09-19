import Tasks from './components/Tasks';
import ThemeProvider from './components/ThemeProvider';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Login from './layouts/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from './actions';

class App extends Component {
  async componentDidMount() {
    await this.props.fetchTasks();
  }

  render() {
    return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/app" element={<MainLayout />}>
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
export default connect(null, { fetchTasks })(App);
