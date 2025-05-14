// src/pages/Dashboard/Meal/DeleteMeal.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

console.log('DeleteMeal file loaded');

const DeleteMeal = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE_URL = 'http://localhost:5063/api/Meal';

  useEffect(() => {
    console.log('DeleteMeal mounted with mealId:', mealId);
    const deleteMeal = async () => {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_BASE_URL}/Meal?mealId=${mealId}`, {
          headers: { Accept: 'text/plain' },
        });
        console.log('DELETE Response:', response.status, response.data);
        if (response.data.statusCode === 200) {
          setSuccess('Meal deleted successfully!');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setError(response.data.error || 'Failed to delete meal');
          console.warn('DELETE Error:', response.data.error);
        }
      } catch (err) {
        setError('Error deleting meal: ' + err.message);
        console.error('Delete Error:', err);
      } finally {
        setLoading(false);
      }
    };
    deleteMeal();
  }, [mealId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (success) return <div style={{ color: 'green' }}>{success}</div>;

  return <div>Preparing to delete meal...</div>; // Fallback UI
};

export default DeleteMeal;