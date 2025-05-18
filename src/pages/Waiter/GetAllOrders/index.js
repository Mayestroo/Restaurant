export const getAllOrders = async (token, orderData, setDatas, setError) => {
  try {
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await fetch(
      "http://localhost:5063/api/Order/ActiveOrders",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        // body: JSON.stringify(orderData),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${
          errorText || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data || typeof data !== "object") {
      throw new Error("Invalid response format from server");
    }

    const resultData = data.result?.data || data.data || data;
    setError(null);
    setDatas(resultData);
    //alert("Order submitted successfully!");

    // if (clearData) {
    //   clearData();
    // }

    return resultData;
  } catch (error) {
    console.error("Error adding order:", error);
    setError(`Failed to add order. ${error.message}`);
    return [];  
  }
};
