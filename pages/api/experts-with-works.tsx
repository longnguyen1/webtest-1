// pages/api/experts-with-works.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

export default function handler(req, res) {
  db.connect((err) => {
    if (err) {
      console.error("Database connection error:", err);
      res.status(500).json({ error: "Database connection failed" });
      return;
    }

    const query = `
      SELECT 
        e.expert_id,
        e.name AS expert_name,
        e.expertise,
        sw.name AS work_name
      FROM Experts e
      LEFT JOIN expertScientificWorks esw ON e.expert_id = esw.expert_id
      LEFT JOIN scientificWorks sw ON esw.work_id = sw.work_id
      ORDER BY e.expert_id;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Failed to fetch data" });
        return;
      }

      // Group data by expert
      const groupedData = results.reduce((acc, row) => {
        const { expert_id, expert_name, expertise, work_name } = row;

        if (!acc[expert_id]) {
          acc[expert_id] = {
            expert_name,
            expertise,
            works: [],
          };
        }

        if (work_name) {
          acc[expert_id].works.push(work_name);
        }

        return acc;
      }, {});

      res.status(200).json(Object.values(groupedData));
    });
  });
}
