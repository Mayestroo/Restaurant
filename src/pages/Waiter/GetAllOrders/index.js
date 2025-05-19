export const getAllOrders = async (orderData, setDatas, setError) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await fetch(
      "http://192.168.1.245:5063/api/Order/ActiveOrders",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
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

    return resultData;
  } catch (error) {
    console.error("Error adding order:", error);
    setError(`Failed to add order. ${error.message}`);
    return [];  
  }
};
