const services = [
  {
    id: 1,
    title: "Web Design",
    description: "We craft clean, modern, and user-friendly website designs tailored to your brand identity.",
  },
  {
    id: 2,
    title: "Front-End Development",
    description: "We build fast, responsive, and interactive web interfaces using modern frameworks and tools.",
  },
  {
    id: 3,
    title: "Branding",
    description: "We help businesses build a strong visual identity through logos, color systems, and brand guidelines.",
  },
];

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json(services);
}