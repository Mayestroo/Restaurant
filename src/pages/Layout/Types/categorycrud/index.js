export async function getCategory(token, setDatas, setError) {
    try {
      const response = await fetch('http://localhost:5063/api/CategoryControlller/AllCategories', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); 
      }
  
      const data = await response.json();
      setError(null);
      setDatas(data?.result?.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again.');
    }
  }