// src/pages/Dashboard/Meal/MealById.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

console.log('MealById file loaded');

const MealById = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5063/api/Meal';

  useEffect(() => {
    console.log('MealById mounted with mealId:', mealId);
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/MealById?mealId=${mealId}`, {
          headers: { Accept: 'text/plain' },
        });
        console.log('GET Response:', response.status, response.data);
        if (response.data.statusCode === 200 && response.data.result) {
          setMeal(response.data.result);
        } else {
          setError(response.data.error || 'Failed to fetch meal');
          console.warn('GET Error:', response.data.error);
        }
      } catch (err) {
        setError('Error fetching meal: ' + err.message);
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [mealId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!meal) return <div>No meal found</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Meal Details</h2>
      <p><strong>Image URL:</strong> {meal.imageUrl}</p>
      <p><strong>Name:</strong> {meal.name}</p>
      <p><strong>Price:</strong> {meal.price}</p>
      <p><strong>Quantity:</strong> {meal.quantity}</p>
      <p><strong>Category ID:</strong> {meal.categoryId}</p>
    </div>
  );
};

export default MealById;