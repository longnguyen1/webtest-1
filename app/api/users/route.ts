import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.query("SELECT * FROM users");
    
    // Sử dụng `users[0]` nếu dữ liệu trả về từ MySQL lồng ghép.
    return NextResponse.json(users[0]); // Trả về chỉ phần tử đầu tiên (mảng phẳng)
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
