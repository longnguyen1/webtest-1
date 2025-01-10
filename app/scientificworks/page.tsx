"use client";

import { useEffect, useState } from "react";

const ScientificWorksPage = () => {
  const [scientificworks, setScientificworks] = useState([]);

  useEffect(() => {
    const fetchScientificWorks = async () => {
      try {
        const response = await fetch("/api/scientificworks");
        if (!response.ok) {
          throw new Error("Failed to fetch scientific works");
        }
        const data = await response.json();
        setScientificworks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScientificWorks();
  }, []);

  return (
    <div>
      <h1>Scientific Works</h1>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Field</th>
            <th>Place of Application</th>
          </tr>
        </thead>
        <tbody>
          {scientificworks.map((work) => (
            <tr key={work.work_id}>
              <td>{work.work_id}</td>
              <td>{work.name}</td>
              <td>{work.field}</td>
              <td>{work.place_of_application}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScientificWorksPage;
