"use client";

import { useEffect, useState } from "react";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [scientificWorks, setScientificWorks] = useState([]);
  const [selectedExpertId, setSelectedExpertId] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/experts?page=${page}&search=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [page, search]);

  const fetchScientificWorks = async (expertId) => {
    console.log("Fetching scientific works for expert ID:", expertId); // Log xác nhận
    setSelectedExpertId(expertId);
    try {
      const response = await fetch(`/api/experts/${expertId}/scientificworks`);
      const data = await response.json();
      console.log("Scientific works data:", data); // Log dữ liệu trả về từ API
      setScientificWorks(data);
    } catch (error) {
      console.error("Error fetching scientific works:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Experts</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search experts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Year of Birth</th>
              <th>Expertise</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experts.data.map((expert) => (
              <tr key={expert.expert_id}>
                <td>{expert.name}</td>
                <td>{expert.code}</td>
                <td>{expert.year_of_birth}</td>
                <td>{expert.expertise}</td>
                <td>
                  <button
                    onClick={() => fetchScientificWorks(expert.expert_id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Xem thêm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedExpertId && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Scientific Works for Expert ID: {selectedExpertId}
          </h2>
          {loading ? (
            <p>Loading scientific works...</p>
          ) : Array.isArray(scientificWorks) && scientificWorks.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Field</th>
                  <th>Place of Application</th>
                </tr>
              </thead>
              <tbody>
                {scientificWorks.map((work) => (
                  <tr key={work.work_id}>
                    <td>{work.name}</td>
                    <td>{work.field}</td>
                    <td>{work.place_of_application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No scientific works found for this expert.</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
