"use client";

import { useEffect, useState } from "react";

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("/api/experts/all");
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div>
      <h1>Experts</h1>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Year of Birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Expertise</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((expert) => (
            <tr key={expert.expert_id}>
              <td>{expert.expert_id}</td>
              <td>{expert.name}</td>
              <td>{expert.code}</td>
              <td>{expert.year_of_birth}</td>
              <td>{expert.address}</td>
              <td>{expert.phone_number}</td>
              <td>{expert.expertise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpertsPage;
