import React, { useState } from 'react';
import Navbar from './navbar';
import Types from '../Types/all/index';
import Search from './search';
import { Outlet } from 'react-router-dom';
import Aside from './aside';
import MealContainer from '../Meal/index';
import { MealsProvider } from '../MealsContext/index'; 

const Layout = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <MealsProvider>
      <section className="layout flex flex-col lg:flex-row w-full h-full">
        <div className="layout-in w-full lg:w-[65%] bg-[#9c9b9b] flex flex-col gap-[15px] p-5">
          <Navbar />
          <Types setSelectedType={setSelectedType} />
          <Search />
          {selectedType && <MealContainer selectedType={selectedType} />}
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