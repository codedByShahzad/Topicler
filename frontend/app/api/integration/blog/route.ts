import { NextResponse } from "next/server";

export async function GET() {
  try {
    const solvixApiUrl = process.env.SOLVIX_API_URL;
    const apiKey = process.env.SOLVIX_API_KEY;
    const apiSecret = process.env.SOLVIX_API_SECRET;

    if (!solvixApiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "SOLVIX_API_URL is not configured",
        },
        { status: 500 }
      );
    }

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Solvix integration credentials are not configured",
        },
        { status: 500 }
      );
    }

    console.log("========== SOLVIX DEBUG ==========");
    console.log("URL:", `${solvixApiUrl}/integration/blogs`);
    console.log("API KEY EXISTS:", !!apiKey);
    console.log("API SECRET EXISTS:", !!apiSecret);

    const response = await fetch(`${solvixApiUrl}/integration/blogs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": apiKey,
        "X-API-Secret": apiSecret,
      },
      cache: "no-store",
    });

    console.log("SOLVIX RESPONSE STATUS:", response.status);

    const result = await response.json();

    console.log("SOLVIX RESPONSE:", result);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          status: response.status,
          data: result,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Topicler blog integration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Solvix",
      },
      { status: 500 }
    );
  }
}