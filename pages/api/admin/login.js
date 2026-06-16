import { createSessionToken } from "@/lib/auth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = createSessionToken();
  const isProd = process.env.NODE_ENV === "production";

  res.setHeader(
    "Set-Cookie",
    `admin_session=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${
      isProd ? "; Secure" : ""
    }`
  );

  res.status(200).json({ message: "Logged in successfully" });
}