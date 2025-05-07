import React, { useState, useEffect } from 'react';

const AddUserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    password: '',
    role: 1,
    permissions: []
  });

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch roles
    fetch('http://localhost:5225/api/Dashboard/AllRoles')
      .then(res => res.json())
      .then(data => setRoles(data.result?.data || []));

    // Fetch permissions
    fetch('http://localhost:5225/api/Dashboard/GetAllPermissions?skip=0&take=10')
      .then(res => res.json())
      .then(data => {
        const perms = Array.isArray(data.result?.data) ? data.result.data : [];
        setPermissions(perms);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionsChange = e => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const permissions = checked
        ? [...prev.permissions, value]
        : prev.permissions.filter(permission => permission !== value);
      return { ...prev, permissions };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5225/api/Dashboard/AddUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        role: parseInt(formData.role),
        permissions: formData.permissions
      })
    }).then(() => {
      onUserAdded();
      setFormData({ userName: '', fullName: '', password: '', role: 1, permissions: [] });
    });
  };

  return (
    <div className="w-full bg-white p-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter username"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="permissions" className="block text-sm font-medium text-gray-700">Permissions</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {permissions.length > 0 ? (
              permissions.map(permission => (
                <div key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`permission-${permission.id}`}
                    value={permission.code}
                    checked={formData.permissions.includes(permission.code)}
                    onChange={handlePermissionsChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={`permission-${permission.id}`} className="ml-2 text-sm text-gray-700">
                    {permission.fullName}
                  </label>
                </div>
              ))
            ) : (
              <p>No permissions available</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setFormData({ userName: '', fullName: '', password: '', role: 1, permissions: [] })}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
