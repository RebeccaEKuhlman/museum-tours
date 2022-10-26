import { sizeHeight } from '@mui/system';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
// import { NoPage } from './pages/NoPage';

export const App = () => {
    const  linkStyle = {
      color: "white",
      textDecoration: "none"
    };
  return (
    <Router>
      <div className="App">
        <ul className="App-header">
          <li>
            <Link style={linkStyle} to="/">Home</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/login">Login</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}