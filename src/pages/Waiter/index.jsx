import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/index';
import Sidebar from './Sidebar';

const Waiter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Waiter;