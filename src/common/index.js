export default async function refreshToken() {
    try {
      const accessToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const url = 'http://192.168.1.245:5106/api/Login/refreshToken';

      const requestBody = {
       refreshToken : refreshToken,
       accessToken : accessToken 
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const token = response.data.result.access_token;
      localStorage.setItem("authToken", token); 
      localStorage.setItem("refreshToken", response.data.result.refresh_token);

      setError(null);
    
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Failed to fetch meals. Please try again.');
    }
  }