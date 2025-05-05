import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    console.log("Fetching users...");
    fetch(`http://localhost:5225/api/Dashboard/GetAllUsers?skip=0&take=100&t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const userArray = data.result?.data || [];
        console.log("User array:", userArray);
        if (!Array.isArray(userArray)) {
          console.error("API did not return an array:", userArray);
          setUsers([]);
          return;
        }
        setUsers(userArray);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  };

  const removeUser = (username) => {
    console.log("Sending DELETE request for username:", username);
    fetch(
      `http://localhost:5225/api/Dashboard/RemoveUser?username=${username}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete user: ${res.statusText}`);
        }
        console.log("User deleted successfully, fetching updated list...");
        return fetchUsers();
      })
      .catch((error) => {
        console.error("Error removing user:", error);
        alert("Failed to remove user. Please try again.");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("Users state:", users);

  return (
    <div className="p-4">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.username}
              className="flex justify-between items-center"
            >
              <span>{user.username || "No username available"}</span>
              <button
                onClick={() => {
                  console.log("Removing user:", user.username);
                  removeUser(user.username);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;