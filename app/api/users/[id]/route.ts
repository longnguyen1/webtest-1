import { NextResponse } from "next/server";
import { db } from "@/lib/db";  // Đảm bảo db được cấu hình đúng

export async function GET({ params }: { params: { userId: string } }) {
    const { userId } = params;
  
    try {
      const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
  }

// Xử lý yêu cầu DELETE để xóa người dùng theo userId
export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Thực hiện xóa người dùng trong database
    const result = await db.query("DELETE FROM users WHERE user_id = ?", [userId]);

    if (result.affectedRows === 0) {
      // Nếu không có dòng dữ liệu nào bị xóa (userId không tồn tại)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// Xử lý yêu cầu PUT để sửa thông tin người dùng theo userId
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
    try {
      const userId = params.userId;
      const { name, email, password } = await req.json();
  
      if (!name || !email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }
  
      await db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?",
        [name, email, password, userId]
      );
  
      return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
  }
