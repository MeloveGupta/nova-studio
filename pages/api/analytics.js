import clientPromise from "@/lib/mongodb";
import { isValidSession } from "@/lib/auth";

const allowedTypes = ["page_visit", "cta_click"];

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("novastudio");
  const events = db.collection("events");

  if (req.method === "POST") {
    const { type, page } = req.body;

    if (!type || !allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid event type" });
    }

    try {
      await events.insertOne({
        type,
        page: page || "/",
        createdAt: new Date(),
      });
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
      const pageVisits = await events.countDocuments({ type: "page_visit" });
      const ctaClicks = await events.countDocuments({ type: "cta_click" });

      return res.status(200).json({ pageVisits, ctaClicks });
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      return res.status(500).json({ message: "Failed to fetch analytics" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}