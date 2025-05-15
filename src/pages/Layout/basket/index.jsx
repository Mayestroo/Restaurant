import React, { useContext } from "react";
import { MealsContext } from "../../Layout/MealsContext";

const Basket = ({ setShowModal }) => {
    const { addedMeals } = useContext(MealsContext);

    const totalPrice = addedMeals.reduce(
        (sum, meal) => sum + Number(meal.price || 0) * (meal.quantity || 0),
        0
    );

    if (totalPrice === 0) return null;

    return (
        <div className="relative flex items-center">
            <button 
                className="order w-auto h-[60px] p-3 bg-white rounded-full gap-1 flex flex-row justify-center items-center cursor-pointer"
                onClick={() => setShowModal(true)} 
            >
                <span className="order-basket w-[40px] h-[40px] bg-blue-50 rounded-full flex flex-row justify-center items-center">
                    <i className="fa-solid fa-basket-shopping text-[25px] text-blue-600"></i>
                </span>
                <p className="order-sum text-xl mx-1 font-medium">
                    {totalPrice.toLocaleString()} so'm
                </p>
            </button>
        </div>
    );
};

export default Basket;