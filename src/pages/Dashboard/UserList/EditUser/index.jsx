import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ onSave }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
    permissions: [],
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchUserDetails = async () => {
      try {
        const [rolesRes, permsRes, userRes] = await Promise.all([
          fetch("http://192.168.1.245:5225/api/Dashboard/AllRoles"),
          fetch(
            `http://192.168.1.245:5225/api/Dashboard/GetAllPermissions?userId=${id}&skip=0&take=100`
          ),
          fetch(`http://192.168.1.245:5225/api/Dashboard/GetUserById?userId=${id}`),
        ]);

        const rolesData = await rolesRes.json();
        const permsData = await permsRes.json();
        const userData = await userRes.json();

        console.log("Fetched User Data:", userData.result);
        console.log("Available Roles:", rolesData.result?.data);
        console.log("Available Permissions:", permsData.result?.data);

        const roles = rolesData.result?.data || [];
        const permissions = permsData.result?.data || [];

        setRoleOptions(roles);
        setPermissionOptions(permissions);

        if (userData.result) {
          const selectedRole = roles.find(
            (role) => role.name === userData.result.name
          );

          const userPermissions = Array.isArray(userData.result.permissions)
            ? userData.result.permissions
            : [];

          setFormData({
            userName: userData.result.username || "",
            password: "",
            role: selectedRole ? selectedRole.id : "",
            permissions: userPermissions,
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handlePermissionChange = (permCode) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permCode)
        ? prev.permissions.filter((p) => p !== permCode)
        : [...prev.permissions, permCode],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userName: formData.userName,
        password: formData.password || undefined,
        role: parseInt(formData.role),
        permissions: formData.permissions,
      };

      const res = await fetch("http://192.168.1.245:5225/api/Dashboard/UpdateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update user: ${errorText}`);
      }

      onSave();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!id) return null;

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Edit User: {formData.userName}</h3>
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
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a role</option>
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
                    value={perm.code}
                    checked={formData.permissions.includes(perm.code)}
                    onChange={() => handlePermissionChange(perm.code)}
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
              onClick={() => navigate("/dashboard")}
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