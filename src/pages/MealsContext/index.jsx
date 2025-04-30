import React, { createContext, useState } from 'react';

export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [addedMeals, setAddedMeals] = useState([]);

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

  return (
    <MealsContext.Provider value={{ addedMeals, addMeal }}>
      {children}
    </MealsContext.Provider>
  );
};