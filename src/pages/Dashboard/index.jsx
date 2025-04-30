import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5225/api/Dashboard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    password: "",
    role: "",
    permissions: [],
  });

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/GetAllUsers`);
    setUsers(res.data.result?.data || []);
  };

  const fetchRoles = async () => {
    const res = await axios.get(`${API_BASE}/AllRoles`);
    setRoles(res.data.result?.data || []);
  };

  const fetchPermissions = async () => {
    const res = await axios.get(`${API_BASE}/GetAllPermissions`);
    setPermissions(res.data.result?.data || []);
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(id)
        ? prev.permissions.filter((pid) => pid !== id)
        : [...prev.permissions, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/AddUser`, formData);
    fetchUsers();
  };

  const handleDelete = async (userName) => {
    await axios.delete(`${API_BASE}/RemoveUser`, { data: { userName } });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-8"
      >
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="userName"
            placeholder="Username"
            className="border p-2"
            onChange={handleInputChange}
          />
          <input
            name="fullName"
            placeholder="Full Name"
            className="border p-2"
            onChange={handleInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2"
            onChange={handleInputChange}
          />
          <select
            name="role"
            className="border p-2"
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block font-medium mb-1">Permissions:</label>
          <div className="grid grid-cols-2 gap-2">
            {permissions.map((p) => (
              <label key={p.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(p.id)}
                  onChange={() => handlePermissionChange(p.id)}
                  className="mr-2"
                />
                {p.fullName}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>

      {/* User List */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.userName}>
                <td className="border p-2">{u.userName}</td>
                <td className="border p-2">{u.fullName}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(u.userName)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  {/* You can add update/edit buttons here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
