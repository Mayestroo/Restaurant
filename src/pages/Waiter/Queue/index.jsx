import React, { useEffect, useState } from "react";
import connection from "../../Waiter/Queue/Connection";

const Queue = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const startConnection = async () => {
      try {
        if (connection.state === "Disconnected") {
          await connection.start();
          console.log("SignalR connected");
        }
      } catch (err) {
        console.error("SignalR connection error:", err);
      }
    };

    startConnection();

    connection.on("ReceiveOrder", (order) => {
      setOrders((prev) => [...prev, order]);
    });

    return () => {
      connection.off("ReceiveOrder");
    };
  }, []);

  const getStatusColor = (status) => {
    if (status === "Faol") return "text-green-500 bg-green-100";
    if (status === "Tugatilgan") return "text-red-500 bg-red-100";
    return "";
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
            {orders.filter((o) => o.status === "Faol").length} faol buyurtma
          </button>
        </div>

        <div className="clients space-y-4 border-2 p-4">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-gray-500">
                    Buyurtma raqami:{" "}
                    <span className="font-medium">{order.number}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Stol raqami:{" "}
                    <span className="font-medium">{order.table}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Se, 22 Aprel 2025 • {order.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.price}</p>
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
            <p className="text-center text-gray-500">Hozircha buyurtmalar yo‘q</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;