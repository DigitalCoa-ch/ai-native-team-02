import { NextRequest, NextResponse } from "next/server";

// Auth route - uses GET/POST handlers from next-auth
// For now, return 503 until DATABASE_URL is configured
export async function GET(req: NextRequest) {
  return NextResponse.json({ error: "Auth not configured" }, { status: 503 });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Auth not configured" }, { status: 503 });
}