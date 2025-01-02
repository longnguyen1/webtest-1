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
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Kiểm tra xem email đã tồn tại chưa
    const [existingUsers] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // Thêm người dùng mới vào cơ sở dữ liệu
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
