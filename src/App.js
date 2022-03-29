import './App.css';
import Register from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Register />}
          />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
