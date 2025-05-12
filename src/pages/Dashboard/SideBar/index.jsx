import React from 'react';
import { Menu, X } from 'lucide-react'; 

const Sidebar = ({ isOpen, toggleSidebar, onMenuSelect }) => {
  return (
    <div
      className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
        isOpen ? 'w-1/5' : 'w-16'
      }`}
    >
      <button onClick={toggleSidebar} className="mb-4">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <>
          <h1 className="text-xl mb-4">Dashboard</h1>
          <ul>
            <li className="cursor-pointer mb-2" onClick={() => onMenuSelect('users')}>All Users</li>
            <li className="cursor-pointer" onClick={() => onMenuSelect('add')}>Add User</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
