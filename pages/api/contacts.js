import pool from "@/lib/db";
import { isValidSession } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.admin_session;
  if (!isValidSession(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await pool.query(
      "SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("db error", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
}