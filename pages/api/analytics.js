import pool from "@/lib/db";
import { isValidSession } from "@/lib/auth";

const allowedTypes = ["page_visit", "cta_click"];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type, page } = req.body;

    if (!type || !allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid event type" });
    }

    try {
      await pool.query(
        "INSERT INTO events (type, page) VALUES ($1, $2)",
        [type, page || "/"]
      );
      return res.status(201).json({ message: "Event logged" });
    } catch (err) {
      console.error("Failed to log analytics event:", err);
      return res.status(500).json({ message: "Failed to log event" });
    }
  }

  if (req.method === "GET") {
    const token = req.cookies.admin_session;
    if (!isValidSession(token)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const pageVisits = await pool.query(
        "SELECT COUNT(*) FROM events WHERE type = 'page_visit'"
      );
      const ctaClicks = await pool.query(
        "SELECT COUNT(*) FROM events WHERE type = 'cta_click'"
      );

      return res.status(200).json({
        pageVisits: parseInt(pageVisits.rows[0].count),
        ctaClicks: parseInt(ctaClicks.rows[0].count),
      });
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      return res.status(500).json({ message: "Failed to fetch analytics" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}