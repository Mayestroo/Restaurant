import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryToRemove, setCategoryToRemove] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = () => {
    fetch(
      `http://192.168.1.245:5063/api/CategoryControlller/AllCategories?skip=0&take=100&t=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched categories:', data); // Debug: Log API response
        const categoryArray = data.result?.data || [];
        setCategories(Array.isArray(categoryArray) ? categoryArray : []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  };

  const removeCategory = (categoryId) => {
    fetch(
      `http://192.168.1.245:5063/api/CategoryControlller/Category?categoryId=${categoryId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to delete category: ${res.statusText}`);
        fetchCategories();
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error removing category:", error);
        alert("Failed to remove category.");
      });
  };

  const handleRemoveClick = (categoryId) => {
    if (!categoryId) {
      alert("Error: Invalid category ID. Try again.");
      return;
    }
    setCategoryToRemove(categoryId);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-2xl font-semibold">All Categories</h2>
        <button
          className="hover:text-blue-600 hover:bg-white font-medium border border-blue-600 hover:border-blue-800 bg-blue-600 text-white rounded px-4 py-2 mt-4 sm:mt-0 cursor-pointer"
          onClick={() => navigate("/dashboard/add-category")}
        >
          Add Category
        </button>
      </div>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Category Name
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, idx) => (
                <tr
                  key={category.id || idx}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {category.name || "No name available"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      aria-label="Edit category"
                      onClick={() => {
                        console.log('Navigating to edit category ID:', category.id);
                        navigate(`/dashboard/edit-category/${category.id}`);
                      }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      aria-label="Remove category"
                      onClick={() => handleRemoveClick(category.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900/50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this category?
            </h3>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => removeCategory(categoryToRemove)}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;