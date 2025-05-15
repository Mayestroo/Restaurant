// src/pages/Dashboard/index.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserList from "./UserList";
import AddUserForm from "./UserList/AddUser";
import Sidebar from "./SideBar/index";
import EditUser from "./UserList/EditUser";
import Category from "./Category";
import EditCategory from "./Category/EditCategory";
import AddCategory from "./Category/AddCategory";
import AddMeal from "./Meal/AddMeal";
// import UpdateMeal from "./Meal/UpdateMeal";
// import MealById from "./Meal/MealById";
import Meals from "./Meal/Meals";
// import DeleteMeal from "./Meal/DeleteMeal";
import EditMeal from "./Meal/EditMeal";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuSelect = (view) => {
    console.log("Sidebar menu selected:", view); 
    if (view === "users") {
      navigate("/dashboard");
    } else if (view === "category") {
      navigate("/dashboard/category");
    } else if (view === "meals") {
      navigate("/dashboard/meals");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onMenuSelect={handleMenuSelect}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-4/5" : "w-full"
        } p-6`}
      >
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route
            path="add"
            element={<AddUserForm onUserAdded={() => navigate("/dashboard")} />}
          />
          <Route
            path="edit/:id"
            element={<EditUser onSave={() => navigate("/dashboard")} />}
          />
          <Route path="category" element={<Category />} />
          <Route
            path="add-category"
            element={<AddCategory onSave={() => navigate("/dashboard")} />}
          />
          <Route
            path="edit-category/:id"
            element={
              <>
                <EditCategory onSave={() => console.log("Category Saved")} />
              </>
            }
          />
          <Route path="meals" element={<Meals onSave={() => navigate("/dashboard")}/>} />
          <Route path="add-meal" element={<AddMeal />} />
          <Route
            path="edit-meal/:id"
            element={<EditMeal onSave={() => navigate("/dashboard")} />}
          />
          {/* <Route path="meal/:mealId" element={<MealById />} />
          <Route path="delete-meal/:mealId" element={<DeleteMeal />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
