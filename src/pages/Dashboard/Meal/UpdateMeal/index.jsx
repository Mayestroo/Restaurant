import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    imageUrl: "",
    description: ""
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5063/api/CategoryControlller/AllCategories");
      setCategories(response.data.result);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchMeal = async () => {
    try {
      const response = await axios.get(`http://localhost:5063/api/Meal/MealById?mealId=${id}`);
      if (response.data.statusCode === 200 && response.data.result) {
        const data = response.data.result;
        setFormData({
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          categoryId: data.categoryId,
          imageUrl: data.imageUrl || "",
          description: data.description || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch meal:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" || name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5063/api/Meal/UpdateMeal?mealId=${id}`, formData);
      navigate("/dashboard/meals");
    } catch (error) {
      console.error("Failed to update meal:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMeal();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="border w-full p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="border w-full p-2 rounded" />
        <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border w-full p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditMeal;
