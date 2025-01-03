import { db } from "@/lib/db"; // Đảm bảo rằng bạn đã cấu hình đúng db ở đây
import { NextResponse } from "next/server";

// API route để lấy toàn bộ dữ liệu experts
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM experts'); // Query lấy tất cả expert từ bảng experts
    return NextResponse.json(rows); // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json({ error: "Error fetching experts" }, { status: 500 });
  }
}
