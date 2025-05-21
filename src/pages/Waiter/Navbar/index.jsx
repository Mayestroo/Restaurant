import React, { useState, useEffect } from 'react';
import { CalendarDays, Menu, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Basket from '../../Layout/basket';
import Aside from '../../Layout/aside';

const Navbar = ({ onMenuClick }) => {
  const today = new Date();
  const days = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'];
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];
  const formattedDate = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  const [activeItem, setActiveItem] = useState('Menu');
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === '/waiter') setActiveItem('Menu');
    else if (path === '/waiter/queue') setActiveItem('Buyurtmalar');
    else if (path === '/waiter/settings') setActiveItem('Sozlamalar');
  }, [location]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow"
        >
          <Menu className="w-5 h-5 text-blue-500" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-black">{activeItem}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow">
          <CalendarDays className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-black">{formattedDate}</span>
        </div>
        <Basket setShowModal={setShowModal} />
        <Aside showModal={showModal} setShowModal={setShowModal} />
        <button className="flex items-center space-x-1 bg-green-100 text-green-600 px-3 py-1.5 rounded-full shadow">
          <span>Buyurtma qo‘shish</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;