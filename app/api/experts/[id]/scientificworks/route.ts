import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id: expertId } = await context.params;

  try {
    // Truy vấn cơ sở dữ liệu
    const [rows] = await db.query(
      `
      SELECT 
        sw.work_id, 
        sw.name, 
        sw.field, 
        sw.place_of_application
      FROM scientificworks sw
      JOIN expertscientificworks esw ON sw.work_id = esw.work_id
      WHERE esw.expert_id = ?
      `,
      [expertId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching scientific works:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch scientific works" }), { status: 500 });
  }
}
