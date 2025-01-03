"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Cập nhật lại hàm fetch để xử lý phân trang và tìm kiếm
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

  // Fetch lại experts khi page hoặc search thay đổi
  useEffect(() => {
    fetchExperts();
  }, [page, search]);

  // Xử lý sự kiện xóa expert
  const handleDelete = async (expertId) => {
    if (confirm("Are you sure you want to delete this expert?")) {
      try {
        const res = await fetch(`/api/experts/${expertId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Expert deleted successfully!");
          // Refetch lại danh sách experts sau khi xóa
          fetchExperts(); // Đảm bảo sau khi xóa, dữ liệu bảng được cập nhật lại
        } else {
          const error = await res.json();
          alert(`Failed to delete expert: ${error.error}`);
        }
      } catch (error) {
        console.error("Error deleting expert:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Experts</h1>

      <button
        onClick={() => router.push("/dashboard/experts/add")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Expert
      </button>

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
            {experts.data && experts.data.length > 0 ? (
              experts.data.map((expert) => (
                <tr key={expert.expert_id}>
                  <td>{expert.name}</td>
                  <td>{expert.code}</td>
                  <td>{expert.year_of_birth}</td>
                  <td>{expert.expertise}</td>
                  <td>
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/experts/edit/${expert.expert_id}`
                        )
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expert.expert_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No experts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={page === 1}
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
