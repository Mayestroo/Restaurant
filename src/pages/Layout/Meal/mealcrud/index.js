import refreshToken from "../../../../common"

export default async function getMeal(token, setDatas, setError, categoryId, name) {
    try {
      const url = 'http://192.168.1.245:5063/api/Meal/Meals';

      const requestBody = {
        name: name,
        categoryId: categoryId,
        skip: 0,
        take: 10,
        model: {} 
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody), 
      });

      if (response.status === 401) { 
      console.log("Token expired, refreshing...");
      token = await refreshToken();
      localStorage.setItem("authToken", token); 

      return getMeal();
    }

  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setError(null);
      setDatas(data?.result?.data); 
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Failed to fetch meals. Please try again.');
    }
  }