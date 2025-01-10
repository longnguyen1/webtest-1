import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Hàm GET lấy danh sách experts hoặc works của expert
export async function GET() {
    try {
      const [results] = await db.query("SELECT * FROM experts WHERE deleted_at IS NULL");
  
      return NextResponse.json({ data: results });
    } catch (error) {
      console.error("Error fetching experts:", error);
      return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 });
    }
  }

export async function POST(req) {
    const { name, code, year_of_birth, expertise, works } = await req.json();
  
    const connection = await db.getConnection();
  
    try {
      await connection.beginTransaction();
  
      // Insert expert vào bảng experts
      const [result] = await connection.query(
        "INSERT INTO experts (name, code, year_of_birth, expertise) VALUES (?, ?, ?, ?)",
        [name, code, year_of_birth, expertise]
      );
      
      const expertId = result.insertId;
  
      // Thêm các scientificworks vào bảng scientificworks
      for (const work of works) {
        const [workResult] = await connection.query(
          "INSERT INTO scientificworks (title, year) VALUES (?, ?)",
          [work.title, work.year]
        );
        
        const workId = workResult.insertId;
  
        // Thêm vào bảng liên kết expertscientificworks
        await connection.query(
          "INSERT INTO expertscientificworks (expert_id, work_id) VALUES (?, ?)",
          [expertId, workId]
        );
      }
  
      await connection.commit();
  
      return NextResponse.json({ message: "Expert and works added successfully" });
    } catch (error) {
      await connection.rollback();
      console.error("Error adding expert and works:", error);
      return NextResponse.json({ error: "Error adding expert and works" }, { status: 500 });
    } finally {
      connection.release();
    }
  }
  
