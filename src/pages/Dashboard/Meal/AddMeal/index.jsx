import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMeal = () => {
  const navigate = useNavigate();
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
    // Load all categories
    fetch("http://localhost:5063/api/CategoryControlller/AllCategories")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setCategories(data.result);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5063/api/Meal/AddMeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          categoryId: parseInt(formData.categoryId),
          imageUrl: formData.imageUrl || null,
          description: formData.description || "",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      // Success
      navigate("/meals"); // or '/dashboard', depending on your routing
    } catch (err) {
      setError("Failed to add meal: " + err.message);
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
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
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
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
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
