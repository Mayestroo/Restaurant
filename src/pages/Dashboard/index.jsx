import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserList from './UserList';
import AddUserForm from './AddUser';
import Sidebar from './Sidebar';
import EditUser from './EditUser';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuSelect = (view) => {
    if (view === 'users') {
      navigate('/dashboard');
    } else if (view === 'add') {
      navigate('/dashboard/add');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        onMenuSelect={handleMenuSelect}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'w-4/5' : 'w-full'
        } p-6`}
      >
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUserForm onUserAdded={() => navigate('/dashboard')} />} />
          <Route path="/edit/:username" element={<EditUser onSave={() => navigate('/dashboard')} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;