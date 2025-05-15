import React from "react";

const MealModal = ({ meal, onClose, addMeal, removeMeal, quantity, imageUrl }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#5D7FC1]/50 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold">{meal?.name}</h2>

        {/* Render image based on passed imageUrl */}
        {imageUrl ? (
          <img src={imageUrl} alt={meal?.name} className="w-full h-40 object-cover rounded-md my-3" />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-md flex justify-center items-center">
            <span>No Image Available</span>
          </div>
        )}

        <p className="text-gray-600">{meal?.description}</p>
        <p className="text-lg font-bold mt-2">{meal?.price?.toLocaleString()} so'm</p>

        <div className="mt-4">
          {quantity === 0 ? (
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => addMeal({ id: meal?.id, name: meal?.name, price: meal?.price, quantity: 1 })}
            >
              Qo'shish
            </button>
          ) : (
            <div className="flex items-center justify-center bg-gray-200 rounded-md px-4 py-2">
              <button className="text-xl font-bold text-gray-700" onClick={() => removeMeal(meal?.id)}>
                -
              </button>
              <span className="text-lg font-medium mx-4">{quantity}</span>
              <button className="text-xl font-bold text-gray-700" onClick={() => addMeal({ id: meal?.id, name: meal?.name, price: meal?.price })}>
                +
              </button>
            </div>
          )}
        </div>

        <button className="mt-5 w-full bg-red-600 text-white py-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MealModal;
