import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost", // Đảm bảo host chính xác
  user: "root", // Tên người dùng
  password: "", // Mật khẩu chính xác
  database: "test", // Tên database chính xác
});
