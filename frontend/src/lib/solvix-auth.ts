import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

function safeCompare(
  value: string | null,
  expected: string | undefined
): boolean {
  if (!value || !expected) {
    return false;
  }

  const a = Buffer.from(value);
  const b = Buffer.from(expected);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

export function verifySolvixRequest(
  request: NextRequest
): boolean {
  const apiKey = request.headers.get("x-api-key");
  const apiSecret = request.headers.get("x-api-secret");

  const validApiKey = process.env.SOLVIX_API_KEY;
  const validApiSecret = process.env.SOLVIX_API_SECRET;

  if (!validApiKey || !validApiSecret) {
    return false;
  }

  return (
    safeCompare(apiKey, validApiKey) &&
    safeCompare(apiSecret, validApiSecret)
  );
}