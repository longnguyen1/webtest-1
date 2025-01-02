import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Cấu hình kết nối MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Thay bằng mật khẩu của bạn
  database: "test",
};

// API handler
export async function GET() {
  try {
    // Kết nối đến database
    const connection = await mysql.createConnection(dbConfig);

    // Lấy dữ liệu từ bảng ScientificWorks
    const [rows] = await connection.execute("SELECT * FROM scientificWorks");

    // Đóng kết nối
    await connection.end();

    // Trả dữ liệu JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching scientific works:", error);
    return NextResponse.json(
      { error: "Failed to fetch scientific works" },
      { status: 500 }
    );
  }
}
