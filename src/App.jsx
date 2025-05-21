import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import Waiter from './pages/Waiter';
import Menu from './pages/Waiter/Sidebar/Menu';
import Queue from './pages/Waiter/Queue';
import Settings from './pages/Waiter/Sidebar/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/waiter" element={<Waiter />}>
          <Route index element={<Menu />} />
          <Route path="menu" element={<Menu />} />
          <Route path='queue' element={<Queue />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;