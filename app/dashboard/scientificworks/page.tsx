"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScientificworksPage() {
  const [scientificworks, setScientificworks] = useState<any[]>([]); // Giả sử experts là một mảng đối tượng
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletedWork, setDeletedWork] = useState<any | null>(null); // Lưu lại expert đã xóa
  const [showUndo, setShowUndo] = useState(false); // Quản lý việc hiển thị nút Undo
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [notification, setNotification] = useState(null);

  // Hàm làm mới dữ liệu
  const refreshData = async () => {
    setLoading(true);
    // Fetch lại danh sách experts (giả sử endpoint là "/api/experts")
    const response = await fetch(
      `/api/scientificworks?page=${page}&search=${search}`
    );
    const data = await response.json();
    setScientificworks(data);
  };

  // Cập nhật lại hàm fetch để xử lý phân trang và tìm kiếm
  const fetchScientificworks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/scientificworks?page=${page}&search=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      setScientificworks(data);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch lại experts khi page hoặc search thay đổi
  useEffect(() => {
    fetchScientificworks();
  }, [page, search]);

  // Xử lý sự kiện xóa expert
  // Xóa expert
  const handleDelete = async (workId: number) => {
    const res = await fetch(`/api/scientificworks/${workId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Lưu lại expert đã xóa
      const deletedWorkData = scientificworks.find(
        (work) => work.work_id === workId
      );
      setDeletedWork(deletedWorkData);

      // Cập nhật lại danh sách experts sau khi xóa
      setScientificworks((prevScientificworks) =>
        prevScientificworks.filter((work) => work.work_id !== workId)
      );

      // Hiển thị nút Undo
      setShowUndo(true);

      // Tự động ẩn thông báo Undo sau 5 giây
      setTimeout(() => {
        setShowUndo(false);
        setDeletedWork(null);
      }, 5000);
    } else {
      alert("Failed to delete work.");
    }
  };

  const undoDelete = async (workId: string) => {
    try {
      const res = await fetch(`/api/scientificworks/${workId}/undelete`, {
        method: "PATCH",
      });

      if (res.ok) {
        alert("Work restored successfully.");
        refreshData(); // Làm mới dữ liệu để hiển thị lại expert
      } else {
        const error = await res.json();
        alert(error.error || "Failed to restore work.");
      }
    } catch (error) {
      console.error("Error restoring work:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Experts</h1>

      <button
        onClick={() => router.push("/dashboard/scientificworks/add")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Work
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
              <th>Field</th>
              <th>Place Of Application</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scientificworks.data && scientificworks.data.length > 0 ? (
              scientificworks.data.map((work) => (
                <tr key={work.work_id}>
                  <td>{work.name}</td>
                  <td>{work.field}</td>
                  <td>{work.place_of_application}</td>
                  <td>
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/scientificworks/edit/${work.work_id}`
                        )
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        const res = await fetch(
                          `/api/scientificworks/${work.work_id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        if (res.ok) {
                          setNotification({
                            message: "Work marked as deleted.",
                            undoAction: () => undoDelete(work.work_id),
                          });
                          refreshData(); // Làm mới giao diện
                        } else {
                          alert("Failed to delete work.");
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
                  No works found
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
