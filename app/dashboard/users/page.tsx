"use client";

import { useState, useEffect } from "react";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // State để lưu người dùng đang sửa

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleAddOrUpdate = async (user) => {
    const method = editingUser ? "PUT" : "POST";
    const endpoint = editingUser
      ? `/api/users/${editingUser.user_id}`
      : "/api/users";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setEditingUser(null);
      fetchUsers(); // Cập nhật lại danh sách người dùng
    } else {
      console.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          users={users}
          onEdit={(user) => setEditingUser(user)} // Khi nhấn Sửa, thiết lập user đang sửa
          onDelete={handleDelete}
        />
      )}

      {editingUser && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrUpdate(editingUser);
            }}
            className="mt-4"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={editingUser.password}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, password: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update User
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
