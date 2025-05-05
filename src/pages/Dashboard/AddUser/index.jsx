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
    fetch('http://localhost:5225/api/Dashboard/AllRoles')
      .then(res => res.json())
      .then(data => setRoles(data.result?.data || []));

    fetch('http://localhost:5225/api/Dashboard/GetAllPermissions')
      .then(res => res.json())
      .then(data => {
        const perms = Array.isArray(data.result) ? data.result : [];
        setPermissions(perms);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionsChange = e => {
    const values = Array.from(e.target.selectedOptions, o => parseInt(o.value));
    setFormData(prev => ({ ...prev, permissions: values }));
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
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" />
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />

      <select name="role" value={formData.role} onChange={handleChange}>
        {roles.map(role => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>

      <select name="permissions" multiple value={formData.permissions.map(String)} onChange={handlePermissionsChange}>
        {permissions.map(p => (
          <option key={p.id ?? p} value={p.id ?? p}>{p.name ?? p}</option>
        ))}
      </select>

      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
