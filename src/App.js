import Tasks from './components/Tasks';
import './App.css';
import MainLayout from './layouts/MainLayout';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' element={<MainLayout />}>
                  <Route
                      path="tasks"
                      element={<Tasks resizable={true} resizerOptions={{minWidth:300}}/>}
                  />
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
