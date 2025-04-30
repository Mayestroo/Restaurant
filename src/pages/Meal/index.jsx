import React, { useEffect, useState, useContext } from 'react';
import { MealsContext } from '../MealsContext/index'; 
import getMeal from './mealcrud/index';
import Meal from './meal';

const MealContainer = ({ selectedType }) => {
  const [meals, setMeals] = useState([]);
  const token = localStorage.getItem('access_token');
  const [error, setError] = useState(null);
  const { addMeal } = useContext(MealsContext);

  useEffect(() => {
    if (selectedType) {
      console.log('Fetching meals for type:', selectedType);
      getMeal(token, setMeals, setError, selectedType.id, null);
    }
  }, [selectedType, token]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Meal meals={meals} addMeal={addMeal} />
      )}
    </div>
  );
};

export default MealContainer;