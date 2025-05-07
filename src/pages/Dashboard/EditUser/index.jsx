import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ onSave }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
    permissions: []
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!username) return;

      setLoading(true);

      try {
        const [rolesRes, permsRes, userRes] = await Promise.all([
          fetch("http://localhost:5225/api/Dashboard/AllRoles"),
          fetch("http://localhost:5225/api/Dashboard/GetAllPermissions?skip=0&take=10"),
          fetch(`http://localhost:5225/api/Dashboard/GetUserById?username=${username}`)
        ]);

        const rolesData = await rolesRes.json();
        const permsData = await permsRes.json();
        const userData = await userRes.json();

        console.log("Fetched User Data:", userData.result);
        console.log("Available Roles:", rolesData.result?.data);
        console.log("Available Permissions:", permsData.result?.data);

        setRoleOptions(rolesData.result?.data || []);
        setPermissionOptions(permsData.result?.data || []);

        setFormData({
          userName: userData.result?.userName || username,
          password: "",
          role: userData.result?.role || (rolesData.result?.data.find(r => r.id === userData.result?.role)?.id || ""),
          permissions: Array.isArray(userData.result?.permissions) ? userData.result.permissions.map(perm => perm.id) : []
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handlePermissionChange = (permId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter((p) => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5225/api/Dashboard/UpdateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to update user");

      onSave();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!username) return null;

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Edit User: {username}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Leave blank to keep unchanged"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: parseInt(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {permissionOptions.map((perm) => (
                <div key={perm.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={perm.id}
                    checked={formData.permissions.includes(perm.id)}
                    onChange={() => handlePermissionChange(perm.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">{perm.fullName}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;