import { NextRequest, NextResponse } from "next/server";
import { generateInsights } from "@/lib/agents/insight-agent";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const investorId = searchParams.get("investorId");
  const focus = searchParams.get("focus") || "all";

  if (!investorId) {
    return NextResponse.json(
      { error: "investorId is required" },
      { status: 400 }
    );
  }

  const insights = await generateInsights(investorId, focus);
  return NextResponse.json(insights);
}