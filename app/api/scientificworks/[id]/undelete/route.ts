import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Đảm bảo kết nối cơ sở dữ liệu

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error:  "Work ID is required" }, { status: 400 });
  }

  try {
    // Cập nhật cột `deleted_at` thành NULL để khôi phục expert
    const query = "UPDATE scientificworks SET deleted_at = NULL WHERE work_id = ?";
    const [result] = await db.query(query, [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Scientific work restored successfully." });
    } else {
      return NextResponse.json(
        { error: "Scientific work not found or already restored." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to restore work." },
      { status: 500 }
    );
  }
}
