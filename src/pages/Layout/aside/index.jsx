import React, { useContext } from 'react';
import { MealsContext } from '../../MealsContext/index';
import edit from '../../../images/edit.svg';
import discount from '../../../images/discount.svg';
import line from '../../../images/line.svg';
import './index.css';
import Common from './common';

const Aside = () => {
  const { addedMeals } = useContext(MealsContext);

  return (
    <section className="aside w-[full] h-[100vh] flex flex-col justify-between bg-white relative">
      <div className="client w-full max-h-[80px] h-full p-3 flex flex-row justify-between">
        <span>
          <h4 className="name text-xl font-medium">Ma'mirjon</h4>
          <p className="text-[#A2A2A2] font-normal">Stol raqami: 7</p>
        </span>
        <div className="edit w-[35px] h-[35px] xl:w-[60px] xl:h-[60px] bg-[#F7F7F7] rounded-full flex items-center justify-center cursor-pointer">
          <img
            className='w-5 h-5'
            src={edit}
            alt="pencil image" />
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
              <p>${(meal.price * meal.quantity).toFixed(2)}</p>
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
        <Common />
        <div className="order py-3 px-5 flex flex-row justify-between">
          {/* <div className="promo relative bg-[#F7F7F7] w-[225px] h-[40px] rounded-full text-[16px] font-normal py-2 pl-3">
            <input className="outline-none" type="text" placeholder="Promokod" />
            <div className="absolute top-[5px] right-2 w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
              <img
                className="w-[16px] h-[16px]"
                src={discount}
                alt="discount image"
              />
            </div>
          </div> */}
          <button className="pay-btn w-[210px] m-auto h-[40px] border rounded-full font-normal outline-none">
            To'lov usuli
          </button>
        </div>
        <button className="order-btn w-full h-[60px] bg-[#2C72FE] font-normal text-[28px] text-white">
          Buyurtma qilish
        </button>
      </div>
    </section>
  );
};

export default Aside;