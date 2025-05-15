import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../../../../context/NotificationContext";

const AddMeal = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: "",
    imageUrl: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.245:5063/api/CategoryControlller/AllCategories"
        );
        if (response.data.result && Array.isArray(response.data.result.data)) {
          setCategories(response.data.result.data);
        } else {
          throw new Error("Categories data is not an array");
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories");
        addNotification("Failed to load categories", "error");
      }
    };
    fetchCategories();
  }, [addNotification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      const response = await axios.post(
        "http://192.168.1.245:5063/api/Meal/AddMeal",
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
        addNotification("Meal added successfully", "success");
        navigate("/dashboard/meals");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Failed to add meal: ${errorMessage}`);
      addNotification(`Failed to add meal: ${errorMessage}`, "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Meal</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Meal name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          name="imageUrl"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;