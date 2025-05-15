import React, { createContext, useState, useEffect } from 'react';

export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [addedMeals, setAddedMeals] = useState(() => {
    try {
      const savedMeals = localStorage.getItem('addedMeals');
      return savedMeals ? JSON.parse(savedMeals) : [];
    } catch (e) {
      console.error('Error parsing localStorage meals:', e);
      return [];
    }
  });

  const [customerData, setCustomerData] = useState(() => {
    try {
      const savedData = localStorage.getItem('customerData');
      return savedData
        ? JSON.parse(savedData)
        : { name: 'Ma\'mirjon', tableNumber: 7 };
    } catch (e) {
      console.error('Error parsing localStorage customerData:', e);
      return { name: 'Ma\'mirjon', tableNumber: 7 };
    }
  });

  useEffect(() => {
    localStorage.setItem('addedMeals', JSON.stringify(addedMeals));
  }, [addedMeals]);

  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify(customerData));
  }, [customerData]);

  const addMeal = (meal) => {
    setAddedMeals((prevMeals) => {
      const existingMeal = prevMeals.find((m) => m.id === meal.id);
      if (existingMeal) {
        return prevMeals.map((m) =>
          m.id === meal.id ? { ...m, quantity: m.quantity + 1 } : m
        );
      }
      return [...prevMeals, { ...meal, quantity: 1 }];
    });
  };

  const removeMeal = (mealId) => {
    setAddedMeals((prevMeals) => {
      const existingMeal = prevMeals.find((m) => m.id === mealId);
      if (existingMeal.quantity > 1) {
        return prevMeals.map((m) =>
          m.id === mealId ? { ...m, quantity: m.quantity - 1 } : m
        );
      }
      return prevMeals.filter((m) => m.id !== mealId);
    });
  };

  const updateCustomerData = (name, tableNumber) => {
    setCustomerData({ name, tableNumber });
  };

  const clearData = () => {
    setAddedMeals([]);
    setCustomerData({ name: 'Ma\'mirjon', tableNumber: 7 });
    localStorage.removeItem('addedMeals');
    localStorage.removeItem('customerData');
  };

  return (
    <MealsContext.Provider value={{ addedMeals, addMeal, removeMeal, customerData, updateCustomerData, clearData }}>
      {children}
    </MealsContext.Provider>
  );
};