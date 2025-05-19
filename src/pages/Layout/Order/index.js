export async function AddOrder(orderData, setDatas, setError, clearData) {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch('http://192.168.1.245:5063/api/Order/AddOrder', {
      method: 'POST',
      headers: {
        "Authorization": `${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from server');
    }

    const resultData = data.result?.data || data.data || data;
    setError(null);
    setDatas(resultData);
    alert('Order submitted successfully!');

    localStorage.removeItem('addedMeals');
    localStorage.removeItem('customerData');
    if (clearData) {
      clearData();
    }
  } catch (error) {
    console.error('Error adding order:', error);
    setError(`Failed to add order. ${error.message}`);
  }
}