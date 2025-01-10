import { db } from "@/lib/db"; // Đảm bảo rằng bạn đã cấu hình đúng db ở đây
import { NextResponse } from "next/server";

// API route để lấy toàn bộ dữ liệu experts
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM scientificworks'); // Query lấy tất cả expert từ bảng experts
    return NextResponse.json(rows); // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json({ error: "Error fetching works" }, { status: 500 });
  }
}