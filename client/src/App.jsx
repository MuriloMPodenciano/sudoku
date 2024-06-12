import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Board from './components/Board.jsx';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
      return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/board"
        element={
          <PrivateRoute>
            <Board />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
};

export default App;
