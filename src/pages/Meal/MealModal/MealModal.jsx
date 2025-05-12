import React, { useState, useEffect } from "react";

const MealModal = ({ meal, onClose, addMeal, removeMeal, quantity }) => {
  if (!meal) return null;

  const [showControls, setShowControls] = useState(quantity > 0); // Track counter visibility

  // Hide controls when quantity returns to 0
  useEffect(() => {
    if (quantity === 0) {
      setShowControls(false);
    }
  }, [quantity]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#5D7FC1]/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold">{meal.name}</h2>
        <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover rounded-md mt-2" />
        <p className="text-gray-600 mt-2">{meal.description}</p>
        <p className="text-xl font-bold mt-2">{meal.price?.toLocaleString()} so'm</p>

        {/* Counter (Appears after "Qo'shish" is clicked) */}
        {showControls && quantity > 0 && (
          <div className="mt-4 flex items-center justify-between bg-gray-200 rounded-md px-4 py-2">
            <button className="text-xl font-bold text-gray-700" onClick={() => removeMeal(meal?.id)}>
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button className="text-xl font-bold text-gray-700" onClick={() => addMeal({ id: meal?.id, name: meal?.name, price: meal?.price })}>
              +
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400 transition" onClick={onClose}>
            Bekor qilish
          </button>
          
          {/* Qo'shish Button (Adds Meal & Shows Counter) */}
          {!showControls && (
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => {
                addMeal({ id: meal?.id, name: meal?.name, price: meal?.price, quantity: 1 });
                setShowControls(true); // Show the counter after adding
              }}
            >
              Qo'shish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealModal;