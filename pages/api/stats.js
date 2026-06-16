const stats = [
  { id: 1, label: "Projects Completed", value: 150, suffix: "+" },
  { id: 2, label: "Clients Worldwide", value: 50, suffix: "+" },
  { id: 3, label: "Years Experience", value: 5, suffix: "" },
];

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json(stats);
}