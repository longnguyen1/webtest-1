// Đây sẽ là phần client để hiển thị bảng và thực hiện các yêu cầu xóa, sửa.
"use client";

import { toast } from "react-toastify";

function UserTable({ users, onEdit, onDelete }) {
  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("User deleted successfully!");
        } else {
          toast.error("Failed to delete user.");
        }
      } catch (err) {
        toast.error("Failed to delete user.");
      }
    } else {
      toast.info("Delete action canceled");
    }
  };

  const handleEdit = (userId: number) => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this user's information?"
    );
    if (confirmEdit) {
      toast.info(`Editing user ${userId}`);
    } else {
      toast.info("Edit action canceled");
    }
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td className="border px-4 py-2">{user.user_id}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(user)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.user_id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
