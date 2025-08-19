// app/api/photos/route.ts
import { client } from "@/lib/contentfulClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = 5;

  try {
    const res = await client.getEntries({
      content_type: "photo",
      limit,
      skip: page * limit,
    });

    return NextResponse.json(res.items);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
