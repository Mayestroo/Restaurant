import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Types from '../Types/all/index';
import Search from './search';
import { Outlet } from 'react-router-dom';
import Aside from './aside';
import MealContainer from '../Meal/index';
import { MealsProvider } from '../MealsContext/index';

const Layout = () => {
  const [selectedType, setSelectedType] = useState(() => {
    try {
      const savedType = localStorage.getItem('selectedType');
      return savedType ? JSON.parse(savedType) : null;
    } catch (e) {
      console.error('Error parsing localStorage selectedType:', e);
      return null;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('selectedType', JSON.stringify(selectedType));
  }, [selectedType]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <MealsProvider>
      <section className="layout flex flex-col lg:flex-row w-full h-full">
        <div className="layout-in w-full lg:w-[65%] bg-[#F7F7F7] flex flex-col gap-[15px] p-5">
          <Navbar />
          <Types setSelectedType={setSelectedType} />
          <Search onSearch={handleSearch} />
          {selectedType && (
            <MealContainer selectedType={selectedType} searchQuery={searchQuery} />
          )}
        </div>
        <main>
          <Outlet />
        </main>
        <div className="aside-in hidden lg:block">
          <Aside />
        </div>
      </section>
    </MealsProvider>
  );
};

export default Layout;