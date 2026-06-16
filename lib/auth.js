import crypto from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET;

export function createSessionToken() {
  return crypto.createHmac("sha256", SECRET).update("admin-session").digest("hex");
}

export function isValidSession(token) {
  if (!token) return false;
  return token === createSessionToken();
}