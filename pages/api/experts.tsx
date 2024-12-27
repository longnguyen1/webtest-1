import connection from "@/lib/db";

export default async function handle(req, res) {
  try {
    //Thuc hien truy van MySQL
    const [rows] = await connection.query("SELCT * FROM experts");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data from database" });
  }
}