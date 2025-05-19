import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/Dashboard/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import Waiter from './pages/Waiter';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path="/dashboard" element={<Dashboard />}
        />
        <Route path='/waiter' element={<Waiter />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
