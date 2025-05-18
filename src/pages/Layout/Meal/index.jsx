import React, { useEffect, useState } from "react";
import getMeal from "./mealcrud/index";
import Meal from "./meal";

const MealContainer = ({ selectedType, searchQuery }) => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const token = localStorage.getItem("access_token");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedType) {
      console.log("Fetching meals for type:", selectedType);
      getMeal(token, setMeals, setError, selectedType.id, null);
    }
  }, [selectedType, token]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMeals(meals);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = meals.filter((meal) =>
        meal.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredMeals(filtered);
    }
  }, [meals, searchQuery]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Meal meals={filteredMeals} />
      )}
    </div>
  );
};

export default MealContainer;
