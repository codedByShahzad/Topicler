import { NextRequest, NextResponse } from "next/server";
import { verifySolvixRequest } from "@/src/lib/solvix-auth";

export async function GET(request: NextRequest) {
  const isValid = verifySolvixRequest(request);

  if (!isValid) {
    return NextResponse.json(
      { ok: false },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { ok: true },
    { status: 200 }
  );
}