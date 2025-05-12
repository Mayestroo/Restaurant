import React, { useContext } from 'react';
import line from '../../../../images/line.svg';
import { MealsContext } from '../../../MealsContext'; 

const Common = () => {
  const { addedMeals } = useContext(MealsContext);

  const totalMealCount = addedMeals.reduce((sum, meal) => sum + (meal.quantity || 0), 0);

  const totalPrice = addedMeals
    .reduce((sum, meal) => sum + Number(meal.price || 0) * (meal.quantity || 0), 0);

  return (
    <div className="common w-full h-auto p-5 flex flex-col gap-4 rounded-t-2xl">
      <div className="all-meals flex flex-row justify-between items-center text-[18px] font-medium">
        <p>Umumiy (ovqatlar, {totalMealCount} ta):</p>
        <p>{totalPrice.toLocaleString()} so'm</p>
      </div>

      <div className="fee text-[#9F9F9F] flex flex-row justify-between items-center">
        <p>Xizmat haqqi:</p>
        <p>0.00</p>
      </div>

      <img src={line} alt="line" />

      <div className="bill text-[18px] font-bold flex flex-row justify-between items-center">
        <p>UMUMIY HISOB:</p>
        <p>{totalPrice.toLocaleString()} so'm</p>
      </div>
    </div>
  );
};

export default Common;