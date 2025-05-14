import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Meals = () => {
  const navigate = useNavigate();
  
  const [meals, setMeals] = useState([]);
  const [skip, setSkip] = useState(0);
  const take = 10;
  const [totalCount, setTotalCount] = useState(0);

  const fetchMeals = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5063/api/Meal/Meals",
        {
          name: "",
          fromPrice: 0,
          toPrice: 0,
          categoryId: 0,
          skip: skip,
          take: take,
        }
      );

      const data = response.data.result;
      setMeals(data.data);
      setTotalCount(data.total_counts);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [skip]);

  const handlePrevious = () => {
    if (skip > 0) setSkip(skip - take);
  };

  const handleNext = () => {
    if (skip + take < totalCount) setSkip(skip + take);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Meals</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            return navigate("/dashboard/add-meal");
          }}
        >
          Add Meal
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-bold">Meal Name</th>
              <th className="py-2 px-4 text-left font-bold">Category</th>
              <th className="py-2 px-4 text-left font-bold">Price</th>
              <th className="py-2 px-4 text-left font-bold">Quantity</th>
              <th className="py-2 px-4 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No meals found
                </td>
              </tr>
            ) : (
              meals.map((meal) => (
                <tr key={meal.id} className="border-t">
                  <td className="py-2 px-4">{meal.name}</td>
                  <td className="py-2 px-4">{meal.categoryName}</td>
                  <td className="py-2 px-4">{meal.price}</td>
                  <td className="py-2 px-4">{meal.quantity}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={skip === 0}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={skip + take >= totalCount}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Meals;
