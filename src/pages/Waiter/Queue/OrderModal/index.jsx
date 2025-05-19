import React, { useState } from "react";
import handleAcceptOrder from "../OrderModal";

const OrderModal = ({ showModal, setShowModal, selectedOrder, token, setError, fetchOrders }) => {
  
  return (
    <div>
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[#5D7FC1]/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-2">Buyurtma Tafsilotlari</h2>
            <p>
              <strong>Buyurtma raqami:</strong> {selectedOrder.orderNumber}
            </p>
            <p>
              <strong>Stol raqami:</strong> {selectedOrder.tableId}
            </p>
            <p>
              <strong>Umumiy narx:</strong> {selectedOrder.totalPrice}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Yopish
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() =>
                  handleAcceptOrder(
                    selectedOrder.id,
                    token,
                    setShowModal,
                    setError,
                    fetchOrders
                  )
                }
              >
                Qabul qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;