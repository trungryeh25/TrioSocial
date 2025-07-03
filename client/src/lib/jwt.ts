export function decodeJWT(token: string) {
  if (!token || token.split(".").length < 2) {
    throw new Error("Invalid token format");
  }

  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const decoded = atob(padded);
  return JSON.parse(decoded);
}
