import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch category data for editing
  useEffect(() => {
    if (isEdit) {
      fetch(
        `http://localhost:5063/api/CategoryControlller/CategoryById?id=${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          const result = data.result;
          if (result && result.name) {
            setName(result.name);
          }
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          alert("Failed to load category.");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { name };

    try {
      const url = isEdit
        ? "http://localhost:5063/api/CategoryControlller/UpdateCategory"
        : "http://localhost:5063/api/CategoryControlller/AddCategory";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isEdit ? { id, ...payload } : payload),
      });

      if (!res.ok) throw new Error("Request failed");

      navigate("/dashboard/category");
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Category" : "Add Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
