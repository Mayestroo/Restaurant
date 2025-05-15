import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useNotification } from "../../../../context/NotificationContext";

const EditMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    imageUrl: "",
    description: "",
  });
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.245:5063/api/CategoryControlller/AllCategories"
      );
      const result = response.data.result;

      if (Array.isArray(result.data)) {
        setCategories(result.data);
      } else {
        throw new Error("Categories data is not an array");
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load categories");
      addNotification("Failed to load categories", "error");
    }
  };

  const fetchMeal = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.245:5063/api/Meal/MealById?mealId=${id}`
      );
      if (response.data.statusCode === 200 && response.data.result) {
        const data = response.data.result;
        setFormData({
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          categoryId: data.categoryId,
          imageUrl: data.imageUrl || "",
          description: data.description || "",
        });
      } else {
        throw new Error("Invalid meal data");
      }
    } catch (error) {
      console.error("Failed to fetch meal:", error);
      setError("Failed to load meal");
      addNotification("Failed to load meal", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const price = parseFloat(formData.price);
      const quantity = parseInt(formData.quantity);
      const categoryId = parseInt(formData.categoryId);

      if (isNaN(price) || isNaN(quantity) || isNaN(categoryId)) {
        throw new Error("Please enter valid numbers for price, quantity, and category");
      }

      const response = await axios.put(
        `http://192.168.1.245:5063/api/Meal/UpdateMeal?mealId=${id}`,
        {
          name: formData.name,
          price,
          quantity,
          categoryId,
          imageUrl: formData.imageUrl || "",
          description: formData.description || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        addNotification("Meal updated successfully", "success");
        navigate("/dashboard/meals");
      }
    } catch (error) {
      console.error("Failed to update meal:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Failed to update meal: ${errorMessage}`);
      addNotification(`Failed to update meal: ${errorMessage}`, "error");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMeal();
  }, [id]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Meal</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          placeholder="Meal Name"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          placeholder="Price (so'm)"
          required
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          placeholder="Quantity"
          required
        />
        <input
          type="file"
          name="imageUrl"
          onChange={handleImageChange}
          className="border w-full p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          placeholder="Description"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditMeal;