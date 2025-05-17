import React, { useState } from 'react'
import Navbar from '../Waiter/Navbar/index'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Queue from './Queue';

const Waiter = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="ml-0 md:ml-64 transition-all duration-300">
                {children}
                <Outlet />
            </main>
            <Queue />
        </div>
    )
}

export default Waiter