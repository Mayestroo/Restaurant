import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

console.log('EditCategory file loaded');

const EditCategory = ({ onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE_URL = 'http://localhost:5063/api/CategoryControlller';

  useEffect(() => {
    console.log('EditCategory mounted with id:', id);
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/CategoryById?categoryId=${id}`, {
          headers: { Accept: 'text/plain' },
        });
        console.log('GET Response:', response.status, response.data);
        if (response.data.statusCode === 200 && response.data.result) {
          setCategory({ name: response.data.result.name || '' });
        } else {
          setError(response.data.error?.message || 'Failed to fetch category');
          console.warn('GET Error:', response.data.error);
        }
      } catch (err) {
        setError('Error fetching category: ' + err.message);
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log('Submitting update for category:', { id, name: category.name });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/UpdateCategory?categoryId=${id}`,
        { name: category.name },
        {
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('PUT Response:', response.status, response.data);
      if (response.data.statusCode === 200) {
        setSuccess('Category updated successfully!');
        onSave();
        setTimeout(() => navigate('/dashboard/category'), 2000);
      } else {
        setError(response.data.error?.message || 'Failed to update category');
        console.warn('PUT Error:', response.data.error);
      }
    } catch (err) {
      setError('Error updating category: ' + err.message);
      console.error('Update Error:', err);
    }
  };

  if (loading) {
    console.log('Rendering loading state for id:', id);
    return <div>Loading Category ID: {id}</div>;
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button
          onClick={() => navigate('/dashboard/category')}
          style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Back to Categories
        </button>
      </div>
    );
  }

  console.log('Rendering form state with category:', category);
  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Edit Category</h2>
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            value={category.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/category')}
            style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;