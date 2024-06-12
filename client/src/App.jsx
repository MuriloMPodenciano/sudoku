import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  );
};

export default App;
