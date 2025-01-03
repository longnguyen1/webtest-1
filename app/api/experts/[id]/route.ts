import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function DELETE(req) {
    const { id } = req.query;
  
    const connection = await db.getConnection();
  
    try {
      await connection.beginTransaction();
  
      // Xoá liên kết trong bảng expertscientificworks
      await connection.query(
        "DELETE FROM expertscientificworks WHERE expert_id = ?",
        [id]
      );
  
      // Xoá expert khỏi bảng experts
      await connection.query(
        "DELETE FROM experts WHERE expert_id = ?",
        [id]
      );
  
      await connection.commit();
  
      return NextResponse.json({ message: "Expert and their works deleted successfully" });
    } catch (error) {
      await connection.rollback();
      console.error("Error deleting expert:", error);
      return NextResponse.json({ error: "Error deleting expert" }, { status: 500 });
    } finally {
      connection.release();
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
  