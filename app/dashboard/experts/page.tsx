"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExpertsPage() {
  const [experts, setExperts] = useState<any[]>([]); // Giả sử experts là một mảng đối tượng
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletedExpert, setDeletedExpert] = useState<any | null>(null); // Lưu lại expert đã xóa
  const [showUndo, setShowUndo] = useState(false); // Quản lý việc hiển thị nút Undo
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [notification, setNotification] = useState(null);

  // Hàm làm mới dữ liệu
  const refreshData = async () => {
    setLoading(true);
    // Fetch lại danh sách experts (giả sử endpoint là "/api/experts")
    const response = await fetch(`/api/experts?page=${page}&search=${search}`);
    const data = await response.json();
    setExperts(data);
  };

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
  // Xóa expert
  const handleDelete = async (expertId: number) => {
    const res = await fetch(`/api/experts/${expertId}`, { method: "DELETE" });

    if (res.ok) {
      // Lưu lại expert đã xóa
      const deletedExpertData = experts.find(
        (expert) => expert.expert_id === expertId
      );
      setDeletedExpert(deletedExpertData);

      // Cập nhật lại danh sách experts sau khi xóa
      setExperts((prevExperts) =>
        prevExperts.filter((expert) => expert.expert_id !== expertId)
      );

      // Hiển thị nút Undo
      setShowUndo(true);

      // Tự động ẩn thông báo Undo sau 5 giây
      setTimeout(() => {
        setShowUndo(false);
        setDeletedExpert(null);
      }, 5000);
    } else {
      alert("Failed to delete expert.");
    }
  };

  const undoDelete = async (expertId: string) => {
    try {
      const res = await fetch(`/api/experts/${expertId}/undelete`, {
        method: "PATCH",
      });

      if (res.ok) {
        alert("Expert restored successfully.");
        refreshData(); // Làm mới dữ liệu để hiển thị lại expert
      } else {
        const error = await res.json();
        alert(error.error || "Failed to restore expert.");
      }
    } catch (error) {
      console.error("Error restoring expert:", error);
      alert("An unexpected error occurred.");
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

      {notification && (
        <div className="bg-gray-100 p-4 rounded shadow-md flex justify-between items-center mb-4 relative">
          <span>{notification.message}</span>
          <button
            onClick={notification.undoAction}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          >
            Undo
          </button>
          <button
            onClick={() => setNotification(null)} // Tắt thông báo
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      )}

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
                      onClick={async () => {
                        const res = await fetch(
                          `/api/experts/${expert.expert_id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        if (res.ok) {
                          setNotification({
                            message: "Expert marked as deleted.",
                            undoAction: () => undoDelete(expert.expert_id),
                          });
                          refreshData(); // Làm mới giao diện
                        } else {
                          alert("Failed to delete expert.");
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
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
