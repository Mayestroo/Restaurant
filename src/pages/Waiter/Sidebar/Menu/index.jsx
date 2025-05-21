import React, { useEffect, useState } from 'react';
import Types from '../../../Layout/Types/all';
import Search from '../../../Layout/search';
import MealContainer from '../../../Layout/Meal';
import { MealsProvider } from '../../../Layout/MealsContext';
import Aside from '../../../Layout/aside';

const Menu = () => {
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
                <div className="layout-in w-full bg-[#F7F7F7] flex flex-col gap-[15px] p-5">
                    <Types setSelectedType={setSelectedType} />
                    <Search onSearch={handleSearch} />
                    {selectedType && (
                        <MealContainer selectedType={selectedType} searchQuery={searchQuery} />
                    )}

                </div>
                <div className="aside-in block">
                    <Aside />
                </div>
            </section>
        </MealsProvider>
    );
};

export default Menu;