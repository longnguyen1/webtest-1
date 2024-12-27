"use client";

import { useEffect, useState } from "react";

export default function ExpertsPage() {
  const [data, setData] = useState<any | null>(null); // Dữ liệu trả về từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  // Hàm gọi API để lấy danh sách các chuyên gia và công trình khoa học
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/experts-with-works");
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        console.log("Data fetched successfully:", result); // Log dữ liệu để kiểm tra

        setData(result); // Lưu dữ liệu vào state
      } catch (err: any) {
        setError(err.message); // Lưu thông báo lỗi nếu có
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    }

    fetchData(); // Gọi hàm fetch khi component mount
  }, []); // Chạy khi component được render lần đầu

  // Nếu đang tải dữ liệu
  if (loading) return <p>Loading...</p>;

  // Nếu có lỗi
  if (error) return <p>Error: {error}</p>;

  // Nếu có dữ liệu
  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <h1>Experts and Their Scientific Works</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Expert Name
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Scientific Works
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.experts?.map((expert: any) => (
            <tr key={expert.expert_id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {expert.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <ul>
                  {expert.works?.length > 0 ? (
                    expert.works.map((work: any, idx: number) => (
                      <li key={idx} style={{ marginBottom: "5px" }}>
                        {work.name}
                      </li>
                    ))
                  ) : (
                    <p>No scientific works available</p>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
