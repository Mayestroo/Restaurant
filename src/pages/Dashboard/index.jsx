import React, { useState } from 'react';
import UserList from './UserList';
import AddUserForm from './AddUser';
import Sidebar from './SideBar';

const Dashboard = () => {
  const [view, setView] = useState('users');

  return (
    <div className="flex">
      <Sidebar onMenuSelect={setView} />
      <div className="flex-grow p-6">
        {view === 'users' && <UserList />}
        {view === 'add' && <AddUserForm onUserAdded={() => setView('users')} />}
      </div>
    </div>
  );
};

export default Dashboard;