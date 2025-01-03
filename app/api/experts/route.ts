import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Đảm bảo bạn đã thiết lập kết nối DB trong lib/db.ts.

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Mặc định là trang 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Mặc định là 10 kết quả
    const search = searchParams.get("search") || ""; // Từ khóa tìm kiếm, mặc định là rỗng

    const offset = (page - 1) * limit;

    // Truy vấn SQL với phân trang và tìm kiếm
    const query = `
      SELECT * FROM experts
      WHERE name LIKE ? OR expertise LIKE ?
      LIMIT ? OFFSET ?
    `;
    const params = [`%${search}%`, `%${search}%`, limit, offset];
    const [experts] = await db.query(query, params);

    // Truy vấn tổng số bản ghi để tính tổng số trang
    const countQuery = `
      SELECT COUNT(*) as total FROM experts
      WHERE name LIKE ? OR expertise LIKE ?
    `;
    const [countResult] = await db.query(countQuery, [`%${search}%`, `%${search}%`]);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Trả về kết quả
    return NextResponse.json({
      data: experts,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json(
      { error: "Failed to fetch experts" },
      { status: 500 }
    );
  }
}
