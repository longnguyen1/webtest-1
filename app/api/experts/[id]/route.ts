import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params; // Đảm bảo params đã được xử lý đầy đủ
  
    try {
      // Lấy thông tin chi tiết của expert
      const expertQuery = `
        SELECT * FROM experts WHERE expert_id = ?
      `;
      const [expertRows] = await db.query(expertQuery, [id]);
  
      if (expertRows.length === 0) {
        return NextResponse.json({ error: "Expert not found" }, { status: 404 });
      }
  
      // Lấy các scientific works liên quan
      const worksQuery = `
        SELECT sw.* FROM scientificworks sw
        JOIN expertscientificworks esw ON esw.work_id = sw.work_id
        WHERE esw.expert_id = ?
      `;
      const [worksRows] = await db.query(worksQuery, [id]);
  
      return NextResponse.json({
        expert: expertRows[0],
        scientificWorks: worksRows,
      });
    } catch (error) {
      console.error("Error fetching expert or works:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }


  export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = context.params;
  
    try {
      // Xóa liên kết trong bảng `expertscientificworks`
      const deleteLinksQuery = `
        DELETE FROM expertscientificworks WHERE expert_id = ?
      `;
      await db.query(deleteLinksQuery, [id]);
  
      // Xóa expert từ bảng `experts`
      const deleteExpertQuery = `
        DELETE FROM experts WHERE expert_id = ?
      `;
      const [result] = await db.query(deleteExpertQuery, [id]);
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: "Expert not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Expert deleted successfully" });
    } catch (error) {
      console.error("Error deleting expert:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  export async function PUT(req, { params }) {
    const { id } = params;
    const { expert, selectedWorks } = await req.json();
  
    try {
      // Cập nhật thông tin expert
      await db.execute(
        `UPDATE experts SET name = ?, code = ?, year_of_birth = ?, expertise = ? WHERE expert_id = ?`,
        [expert.name, expert.code, expert.year_of_birth, expert.expertise, id]
      );
  
      // Xoá tất cả các scientific works liên kết cũ
      await db.execute(
        `DELETE FROM expertscientificworks WHERE expert_id = ?`,
        [id]
      );
  
      // Thêm lại các scientific works mới
      for (const workId of selectedWorks) {
        await db.execute(
          `INSERT INTO expertscientificworks (expert_id, work_id) VALUES (?, ?)`,
          [id, workId]
        );
      }
  
      return new Response("Expert updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error updating expert:", error);
      return new Response("Error updating data", { status: 500 });
    }
  }
  