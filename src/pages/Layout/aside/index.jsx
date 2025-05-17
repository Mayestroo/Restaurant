import React, { useContext, useState } from "react";
import { MealsContext } from "../MealsContext";
import line from "../../../images/line.svg";
import "./index.css";
import { getOrder } from "../Order";

const Aside = ({ showModal, setShowModal }) => {
  if (!showModal) return null;
  const { addedMeals, clearData } = useContext(MealsContext);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState(null);

  const totalAmount = addedMeals.reduce(
    (sum, meal) => sum + Number(meal.price || 0) * (meal.quantity || 0),
    0 
  );

  const tableId = 1
  const serviceFee = 0;
  const grandTotal = totalAmount + serviceFee;

  const sendOrderToBackend = async () => {
    const orderData = {
      Items: addedMeals.map((meal) => ({
        menuItemId : meal.id,
        name: meal.name,
        price: Number(meal.price || 0),
        quantity: meal.quantity || 0,
        total: Number(meal.price || 0) * (meal.quantity || 0),
      })),
      totalAmount,
      tableId,
      client: { name: "Ma'mirjon", tableNumber: 7 },
    };

    const token = "your-auth-token-here";

    await getOrder(token, orderData, setDatas, setError, clearData);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex z-[99] items-center justify-center bg-[#5D7FC1]/50 bg-opacity-50">
          <div className="aside-container w-full max-w-[400px] h-auto flex flex-col bg-white shadow-lg rounded-lg p-5 relative">

            <button
              className="absolute top-2 right-3 font-bold text-xl"
              onClick={() => setShowModal(false)}
            >
              <i className="fa-solid fa-x"></i>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">Savatcha</h2>

            <div className="order-list text-[#8A8A8A] flex flex-col gap-3">
              {addedMeals && addedMeals.length > 0 ? (
                addedMeals.map((meal, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">{meal.name}</p>
                      <p className="text-sm text-gray-600">{meal.quantity} x {(meal.price).toLocaleString()} so'm</p>
                    </div>
                    <p className="font-medium text-lg">{(meal.price * meal.quantity).toLocaleString()} so'm</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600">
                  <p>Hozircha hech narsa yo‘q</p>
                  <img src={line} alt="line image" className="mx-auto mt-2" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t pt-3 mt-3">
              <p className="text-gray-700">Servis narxi:</p>
              <p className="font-medium">{serviceFee.toLocaleString()} so'm</p>
            </div>

            <div className="flex justify-between items-center bg-green-400 text-white font-bold text-lg p-3 rounded-lg mt-4">
              <p>Jami:</p>
              <p>{grandTotal.toLocaleString()} so'm</p>
            </div>

            {error && <p className="text-red-500 text-center mt-3">{error}</p>}

            <button
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              onClick={sendOrderToBackend}
            >
              Buyurtma qilish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Aside;