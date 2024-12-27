import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM experts"; //in du lieu trong bang experts
    const [experts] = await db.query(sql);
    return NextResponse.json(experts: experts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
