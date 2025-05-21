import React, { useEffect, useState } from 'react';
import { LayoutGrid, ShoppingCart, Settings, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('Menu'); 
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'sidebar-overlay') {
      onClose();
    }
  };

  const handleItemClick = (label, path) => {
    setActiveItem(label);
    navigate(path);
    onClose(); 
  };

  return (
    <div
      id="sidebar-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#5D7FC1]/50 bg-opacity-30 z-40"
    >
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow transition-transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <img
              src="https://ui-avatars.com/api/?name=Ashurbek"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">Ashurbek</p>
              <p className="text-gray-400 text-xs">Ofitsant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-4">
          <SidebarItem
            icon={<LayoutGrid className="w-4 h-4" />}
            label="Menu"
            active={activeItem === 'Menu'}
            onClick={() => handleItemClick('Menu', '/waiter')}
          />
          <SidebarItem
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Buyurtmalar"
            active={activeItem === 'Buyurtmalar'}
            onClick={() => handleItemClick('Buyurtmalar', '/waiter/queue')}
          />
          <SidebarItem
            icon={<Settings className="w-4 h-4" />}
            label="Sozlamalar"
            active={activeItem === 'Sozlamalar'}
            onClick={() => handleItemClick('Sozlamalar', '/waiter/settings')}
          />
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button className="flex items-center justify-between w-full bg-gray-100 text-red-500 px-4 py-2 rounded-lg">
            <span>Log Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
      active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-black'
    }`}
  >
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
      }`}
    >
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;