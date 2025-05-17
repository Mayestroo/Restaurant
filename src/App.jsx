import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './pages/Dashboard/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import Waiter from './pages/Waiter'
import { useEffect } from 'react';
import connection from './pages/Waiter/Queue/Connection';

const App = () =>
  
  useEffect(() => {
    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          console.log('SignalR connected in App');
        } else {
          console.log('SignalR already connecting/connected:', connection.state);
        }
      } catch (err) {
        console.error('SignalR connection error in App:', err);
      }
    };

    startConnection();

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='/waiter' element={<Waiter />} />
        </Routes>
        <ToastContainer position='top-center' autoClose={3000} />
      </BrowserRouter>
    )
  }, []);

export default App