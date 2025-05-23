import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.login || !formData.password) {
      setError("Login and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.245:5106/api/Login/token",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.result?.access_token) {
        throw new Error("Invalid credentials.");
      }

      const token = response.data.result.access_token;
      localStorage.setItem("authToken", token); 
      localStorage.setItem("refreshToken", response.data.result.refresh_token); 

      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      var roleId = decodedToken.roleId;
      if (roleId == 4 || roleId == 1) {
        navigate("/dashboard");
      } else if (roleId == 2) {
        navigate("/waiter");
      } else {
        setError("Invalid role.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
