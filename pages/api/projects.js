import pool from "@/lib/db";
import { isValidSession } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT id, title, category, image FROM projects ORDER BY id ASC"
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    const token = req.cookies.admin_session;
    if (!isValidSession(token)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, category, image } = req.body;

    if (!title || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const result = await pool.query(
        "INSERT INTO projects (title, category, image) VALUES ($1, $2, $3) RETURNING id, title, category, image",
        [title, category, image]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("add project error:", err.message);
      return res.status(500).json({ message: "Failed to add project" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}