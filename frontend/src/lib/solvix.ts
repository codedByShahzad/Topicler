import "server-only";

const SOLVIX_API_URL = process.env.SOLVIX_API_URL;
const SOLVIX_API_KEY = process.env.SOLVIX_API_KEY;
const SOLVIX_API_SECRET = process.env.SOLVIX_API_SECRET;

export async function getSolvixBlogs() {
  if (!SOLVIX_API_URL) {
    throw new Error("SOLVIX_API_URL is not configured");
  }

  if (!SOLVIX_API_KEY || !SOLVIX_API_SECRET) {
    throw new Error("Solvix API credentials are not configured");
  }

  const response = await fetch(`${SOLVIX_API_URL}/integration/blogs`, {
    method: "GET",
    headers: {
      "X-API-Key": SOLVIX_API_KEY,
      "X-API-Secret": SOLVIX_API_SECRET,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Solvix API failed: ${response.status} ${errorText}`
    );
  }

  const result = await response.json();

  console.log("========== SOLVIX BLOG FETCH ==========");
  console.log("API RESPONSE:", result);
  console.log("BLOG DATA:", result.data);
  console.log("BLOG COUNT:", result.data?.length ?? 0);
  console.log("=======================================");

  return result.data;
}