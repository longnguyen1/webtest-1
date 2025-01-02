import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Tạo kết nối tới cơ sở dữ liệu
const pool = mysql.createPool({
  host: "localhost", // Địa chỉ máy chủ MySQL
  user: "root",      // Tên đăng nhập MySQL
  password: "", // Mật khẩu MySQL
  database: "test", // Tên cơ sở dữ liệu
});

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Kiểm tra dữ liệu trong cơ sở dữ liệu
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];

    // Trả về token hoặc thông tin cần thiết
    return NextResponse.json({
      token: "dummy-token", // Hoặc tạo token JWT
      name: user.name,
      email: user.email,
      last_login: user.last_login,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
