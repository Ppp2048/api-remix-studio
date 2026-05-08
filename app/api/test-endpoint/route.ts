import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "API Remix Studio",
    timestamp: new Date().toISOString(),
    message: "Route handlers are live.",
  });
}
