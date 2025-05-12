import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null); 
  const navigate = useNavigate();

  const fetchUsers = () => {
    fetch(`http://localhost:5225/api/Dashboard/GetAllUsers?skip=0&take=100&t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const userArray = data.result?.data || [];
        setUsers(Array.isArray(userArray) ? userArray : []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  };

  const removeUser = (username) => {
    fetch(`http://localhost:5225/api/Dashboard/RemoveUser?username=${username}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to delete user: ${res.statusText}`);
        fetchUsers();
        setShowModal(false); 
      })
      .catch((error) => {
        console.error("Error removing user:", error);
        alert("Failed to remove user. Please try again.");
      });
  };

  const handleRemoveClick = (username) => {
    setUserToRemove(username); 
    setShowModal(true); 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Username</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.username || idx} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.username || "No username available"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      aria-label="Edit user"
                      onClick={() => navigate(`/dashboard/edit/${user.username}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      aria-label="Remove user"
                      onClick={() => handleRemoveClick(user.username)}
                      className="text-red-600 hover:text-red-800"
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
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this user?</h3>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)} 
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeUser(userToRemove); 
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

export default UserList;
