import './App.css';
import Tasks from './components/Tasks';
import RequireAuth from './components/RequireAuth';
import ThemeProvider from './components/ThemeProvider';
import MainLayout from './layouts/MainLayout';
import Login from './layouts/Login';
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, restoreSession, userInfo } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.restoreSession();
  }

  render() {
    return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={this.props.authenticated ? '/app/tasks' : '/login'}
                  replace
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                !this.props.authenticated ? (
                  <>
                    <Login />
                  </>
                ) : (
                  <Navigate to="/app/tasks" />
                )
              }
            ></Route>
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
function mapStateToProps(state) {
  return {
    authenticated: state.userProfile.authenticated,
  };
}
export default connect(mapStateToProps, {
  fetchTasks,
  restoreSession,
  userInfo,
})(App);
