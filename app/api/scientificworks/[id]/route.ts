import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params; // Đảm bảo params đã được xử lý đầy đủ
  
    try {
      // Lấy thông tin chi tiết của expert
      const worksQuery = `
        SELECT * FROM scientificworks WHERE work_id = ?
      `;
      const [worksRows] = await db.query(worksQuery, [id]);
  
      if (worksRows.length === 0) {
        return NextResponse.json({ error: "Work not found" }, { status: 404 });
      }
  
      // Lấy các scientific works liên quan
      const expertQuery = `
        SELECT sw.* FROM scientificworks sw
        JOIN expertscientificworks esw ON esw.work_id = sw.work_id
        WHERE esw.expert_id = ?
      `;
      const [expertRows] = await db.query(expertQuery, [id]);
  
      return NextResponse.json({
        scientificWorks: worksRows[0],
        works: expertRows,
      });
    } catch (error) {
      console.error("Error fetching expert or works:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
 // Hoặc đường dẫn đúng tới kết nối DB của bạn

// Phương thức DELETE để xóa expert và các liên kết
export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
    //console.log(context.params);
    // Kiểm tra nếu ID không tồn tại
    if (!id) {
      return NextResponse.json({ error: 'Work ID is required' }, { status: 400 });
    }
  
    try {
      // Câu lệnh xóa dữ liệu trong bảng expertscientificworks (liên kết với scientific works)
      const deleteLinksQuery = "DELETE FROM expertscientificworks WHERE work_id = ?";
      await db.query(deleteLinksQuery, [id]);
  
      // Xóa thông tin expert trong bảng experts
      const query = "UPDATE scientificworks SET deleted_at = NOW() WHERE work_id = ?";
        await db.execute(query, [id]);

        return NextResponse.json({ message: "Work marked as deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting work:", error);
      return NextResponse.json({ error: "Unable to delete work" }, { status: 500 });
    }
  }  

  export async function PUT(req, { params }) {
    const { id } = params;
    const { work, selectedExperts } = await req.json();
  
    try {
      // Cập nhật thông tin expert
      await db.execute(
        `UPDATE scientificworks SET name = ?, field = ?, place_of_application = ?, expertise = ? WHERE expert_id = ?`,
        [work.name, work.code, work.year_of_birth, work.expertise, id]
      );
  
      // Xoá tất cả các scientific works liên kết cũ
      await db.execute(
        `DELETE FROM expertscientificworks WHERE work_id = ?`,
        [id]
      );
  
      // Thêm lại các scientific works mới
      for (const expertId of selectedExperts) {
        await db.execute(
          `INSERT INTO expertscientificworks ( work_id, expert_id) VALUES (?, ?)`,
          [id, expertId]
        );
      }
  
      return new Response("Work updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error updating work:", error);
      return new Response("Error updating data", { status: 500 });
    }
  }
  