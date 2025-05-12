import React, { useContext, useState } from 'react';
import { MealsContext } from '../../MealsContext/index';
import edit from '../../../images/edit.svg';
import discount from '../../../images/discount.svg';
import line from '../../../images/line.svg';
import './index.css';
import Common from './common';
import { getOrder } from '../../Order/index'; 

const Aside = () => {
  const { addedMeals, clearData } = useContext(MealsContext);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState(null);

  const sendOrderToBackend = async () => {
    const orderData = {
      Items: addedMeals.map(meal => ({
        name: meal.name,
        price: Number(meal.price || 0),
        quantity: meal.quantity || 0,
        total: Number(meal.price || 0) * (meal.quantity || 0)
      })),
      totalAmount: addedMeals.reduce((sum, meal) => sum + Number(meal.price || 0) * (meal.quantity || 0), 0),
      client: { name: "Ma'mirjon", tableNumber: 7 }
    };

    const token = 'your-auth-token-here';

    await getOrder(token, orderData, setDatas, setError, clearData);
  };

  return (
    <section className="aside w-[full] h-[100vh] flex flex-col justify-between bg-white relative">
      <div className="client w-full max-h-[80px] h-full p-3 flex flex-row justify-between">
        <span>
          <h4 className="name text-xl font-medium">Ma'mirjon</h4>
          <p className="text-[#A2A2A2] font-normal">Stol raqami: 7</p>
        </span>
        <div className="edit w-[35px] h-[35px] xl:w-[60px] xl:h-[60px] bg-[#F7F7F7] rounded-full flex items-center justify-center cursor-pointer">
          <img className='w-5 h-5' src={edit} alt="pencil image" />
        </div>
      </div>

      <div className="order-list text-center text-[#8A8A8A] flex flex-col gap-5 pt-5">
        {addedMeals && addedMeals.length > 0 ? (
          addedMeals.map((meal, index) => (
            <div
              key={index}
              className="added-meal flex justify-between px-4 py-2 bg-gray-100 rounded-md"
            >
              <p>{meal.name}</p>
              <p>{meal.quantity}x</p>
              <p>{(meal.price * meal.quantity).toLocaleString()} so'm</p>
            </div>
          ))
        ) : (
          <>
            <p>Hozircha hech narsa yo‘q</p>
            <img src={line} alt="line image" />
          </>
        )}
      </div>

      <div className="common">
        <Common addedMeals={addedMeals} /> 
        {error && <p className="text-red-500">{error}</p>}
        <div className="order py-3 px-5 flex flex-row justify-between">
          <button className="pay-btn w-[210px] m-auto h-[40px] border rounded-full font-normal outline-none">
            To'lov usuli
          </button>
        </div>
        <button
          className="order-btn w-full h-[60px] bg-[#2C72FE] font-normal text-[28px] text-white"
          onClick={sendOrderToBackend}
        >
          Buyurtma qilish
        </button>
      </div>
    </section>
  );
};

export default Aside;