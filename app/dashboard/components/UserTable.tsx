import React from "react";

export default function UserTable({ users }: { users: any[] }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2">ID</th>
          <th className="border border-gray-400 p-2">Name</th>
          <th className="border border-gray-400 p-2">Email</th>
          <th className="border border-gray-400 p-2">Last Login</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {" "}
            {/* Đảm bảo thuộc tính `key` được thêm vào */}
            <td className="border border-gray-400 p-2">{user.id}</td>
            <td className="border border-gray-400 p-2">{user.name}</td>
            <td className="border border-gray-400 p-2">{user.email}</td>
            <td className="border border-gray-400 p-2">
              {user.last_login || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
