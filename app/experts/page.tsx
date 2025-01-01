"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [experts, setExperts] = useState([]);
  const [scientificworks, setScientificworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/experts");

        /// Kiểm tra trạng thái phản hồi
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Kiểm tra Content-Type
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Danh sách chuyên gia</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Expert ID</th>
            <th>Expert Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((expert) => (
            <tr key={expert.expert_id}>
              <td>{expert.expert_id}</td>
              <td>{expert.name}</td>
              <td>{expert.expertise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
