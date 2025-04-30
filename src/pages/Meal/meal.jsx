import React, { useContext } from 'react';
import { MealsContext } from '../MealsContext/index';

const Meal = ({ meals }) => {
  const { addedMeals, addMeal, removeMeal } = useContext(MealsContext);

  return (
    <div className="flex flex-col gap-4">
      {meals.map((meal) => {
        const mealInCart = addedMeals.find((m) => m.id === meal.id);
        const quantity = mealInCart ? mealInCart.quantity : 0;

        return (
          <div
            key={meal.id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
          >
            <p className="text-lg">{meal.name}</p>
            <p className="text-lg">${meal.price}</p>
            {quantity === 0 ? (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => addMeal({ id: meal.id, name: meal.name, price: meal.price })}
              >
                Qo'shish
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300 transition flex items-center justify-center text-xl"
                  onClick={() => removeMeal(meal.id)}
                >
                  -
                </button>
                <span className="text-lg min-w-[24px] text-center">{quantity}</span>
                <button
                  className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300 transition flex items-center justify-center text-xl"
                  onClick={() => addMeal({ id: meal.id, name: meal.name, price: meal.price })}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Meal;