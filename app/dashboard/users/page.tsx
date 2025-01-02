"use client";

import { useState, useEffect } from "react";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      {loading ? <p>Loading...</p> : <UserTable users={users} />}
    </div>
  );
}
