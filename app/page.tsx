"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/experts");

        // Kiểm tra nếu phản hồi không phải JSON
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/json")
        ) {
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
      <h1>List of Experts</h1>
      <ul>
        {experts.map((expert) => (
          <li key={expert.expert_id}>
            {expert.name} - {expert.expertise}
          </li>
        ))}
      </ul>
    </div>
  );
}
