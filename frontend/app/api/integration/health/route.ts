import { NextRequest, NextResponse } from "next/server";
import { verifySolvixRequest } from "@/src/lib/solvix-auth";

export async function GET(request: NextRequest) {
//   const isAuthenticated = verifySolvixRequest(request);

//   if (!isAuthenticated) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Unauthorized",
//       },
//       { status: 401 }
//     );
//   }

  return NextResponse.json(
    {
      success: true,
      message: "Topicler API is healthy",
      data: {
        service: "Topicler",
        status: "healthy",
      },
    },
    { status: 200 }
  );
}