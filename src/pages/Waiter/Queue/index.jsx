import React, { useEffect, useState } from "react";
import connection from "../../Waiter/Queue/Connection";
import { getAllOrders } from "../GetAllOrders/index.js";

const Queue = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState(null);
  const token = "your-auth-token-here";
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const orderData = {};
    try {
      let res = await getAllOrders(token, orderData, setDatas, setError);
      setOrders(res);
      setShowModal(false);
    } catch (err) {
      setError("Buyurtma olishda xatolik: " + err.message);
    }
  };

  useEffect(() => {
    const handleNewOrder = (newOrder) => {
      console.log("Yangi buyurtma keldi:", newOrder);
      setOrders((prev) => [...prev, newOrder]);
    };

    connection.off("NewOrder"); // Remove previous listeners to avoid duplication
    connection.on("NewOrder", handleNewOrder);

    return () => {
      connection.off("NewOrder", handleNewOrder);
    };
  }, []);

  useEffect(() => {
    const handleRemoveOrder = (orderId) => {
      console.log("Buyurtma olib tashlandi:", orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    };

    connection.off("RemoveOrder"); // Avvalgi listenerni olib tashlash
    connection.on("RemoveOrder", handleRemoveOrder);

    return () => {
      connection.off("RemoveOrder", handleRemoveOrder); // Clean-up
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR Muhammadali!");
          console.log("currentConnectionUserId", connection.connectionId);
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Faol") return "text-green-500 bg-green-100";
    if (status === "Tugatilgan") return "text-red-500 bg-red-100";
    return "";
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5063/api/Order/WaitorAcceptOrder?orderId=${orderId}`, // Using query parameter
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({ orderId, waiterId }), // Uncomment if necessary
        }
      );
      if (!response.ok) {
        throw new Error("Buyurtma qabul qilishda xatolik");
      }
      const data = await response.json();
      console.log("Buyurtma qabul qilindi:", data);
      //setOrders((prev) => prev.filter((order) => order.id !== orderId));
      setShowModal(false);
    } catch (error) {
      console.error("Buyurtma qabul qilishda xatolik:", error);
      setError("Buyurtma qabul qilishda xatolik: " + error.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-64 p-4 space-y-3">
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-xl bg-blue-100 text-blue-600 font-medium">
            Buyurtmalar navbati
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100">
            Stollar
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100">
            Buyurtmalar tarixi
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex space-x-3 mb-4">
          <button className="ml-auto px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 font-medium">
            {orders.length} faol buyurtma
          </button>
        </div>

        <div className="clients space-y-4 border-2 p-4">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2 cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowModal(true);
                }}
              >
                <div>
                  <p className="text-sm text-gray-500">
                    Buyurtma raqami:{" "}
                    <span className="font-medium">{order.orderNumber}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Stol raqami:{" "}
                    <span className="font-medium">{order.tableId}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Se, 22 Aprel 2025 • {order.orderedTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.totalPrice}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Hozircha buyurtmalar yo‘q
            </p>
          )}
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[#5D7FC1]/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-2">
              Buyurtma Tafsilotlari
            </h2>
            <p>
              <strong>Buyurtma raqami:</strong> {selectedOrder.orderNumber}
            </p>
            <p>
              <strong>Stol raqami:</strong> {selectedOrder.tableId}
            </p>
            <p>
              <strong>Umumiy narx:</strong> {selectedOrder.totalPrice}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowModal(false)}
            >
              Yopish
            </button>
            <button onClick={() => handleAcceptOrder(selectedOrder.id)}>
              Qabul qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;
