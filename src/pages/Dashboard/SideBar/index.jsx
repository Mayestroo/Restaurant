import React from 'react';

const Sidebar = ({ onMenuSelect }) => {
  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <ul>
        <li className="cursor-pointer" onClick={() => onMenuSelect('users')}>All Users</li>
        <li className="cursor-pointer" onClick={() => onMenuSelect('add')}>Add User</li>
      </ul>
    </div>
  );
};

export default Sidebar;