import React, { useContext } from 'react';
import { MealsContext } from '../MealsContext/index'; 

const Meal = ({ meals }) => {
  const { addMeal } = useContext(MealsContext);

  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-item">
          <p>{meal.name}</p>
          <p>${meal.price}</p>
          <button
            onClick={() => addMeal({ id: meal.id, name: meal.name, price: meal.price })}
          >
            Qo'shish
          </button>
        </div>
      ))}
    </div>
  );
};

export default Meal;