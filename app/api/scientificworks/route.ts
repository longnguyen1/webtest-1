import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Hàm GET lấy danh sách experts hoặc works của expert
export async function GET() {
    try {
      const [results] = await db.query("SELECT * FROM scientificworks WHERE deleted_at IS NULL");
      return NextResponse.json({ data: results });
    } catch (error) {
      console.error("Error fetching works:", error);
      return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 });
    }
  }

export async function POST(req) {
    const { name, field, place_of_application, experts } = await req.json();
  
    const connection = await db.getConnection();
  
    try {
      await connection.beginTransaction();
  
      // Insert expert vào bảng experts
      const [result] = await connection.query(
        "INSERT INTO experts (name, field, place_of_application) VALUES (?, ?, ?)",
        [name, field, place_of_application]
      );
      
      const workId = result.insertId;
  
      // Thêm các scientificworks vào bảng scientificworks
      for (const expert of experts) {
        const [expertResult] = await connection.query(
          "INSERT INTO experts (title, year) VALUES (?, ?)",
          [expert.title, expert.year]
        );
        
        const expertId = expertResult.insertId;
  
        // Thêm vào bảng liên kết expertscientificworks
        await connection.query(
          "INSERT INTO expertscientificworks ( work_id, expert_id) VALUES (?, ?)",
          [workId, expertId]
        );
      }
  
      await connection.commit();
  
      return NextResponse.json({ message: "Work and experts added successfully" });
    } catch (error) {
      await connection.rollback();
      console.error("Error adding Work and experts:", error);
      return NextResponse.json({ error: "Error adding Work and experts" }, { status: 500 });
    } finally {
      connection.release();
    }
  }
  
