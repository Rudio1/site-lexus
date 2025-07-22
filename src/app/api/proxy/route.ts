import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// const apiKey = process.env.API_KEY!;
const baseUrl = "https://api-pb-landingpage-hmg.azurewebsites.net";

const endpoints: { [key: string]: string } = {
  banners: `${baseUrl}/api/get-data/campaign/bannersLexus`,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint || !endpoints[endpoint]) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }

  try {
    const response = await axios.get(endpoints[endpoint], {
      headers: { "x-api-key": "AkXc:gt_a/#Nd1f6b@&S/9Nq2hBiqy!N*((s5:*y8;3,53T)^H" },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
} 