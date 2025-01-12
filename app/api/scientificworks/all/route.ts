import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Lấy toàn bộ dữ liệu (GET)
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM scientificworks");
    return NextResponse.json({ data: rows }); // Đồng nhất trả về trường `data`
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json({ error: "Error fetching works" }, { status: 500 });
  }
}
