import { NextRequest, NextResponse } from "next/server";
import { generateBriefing } from "@/lib/briefing/agent";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const topic = body.topic?.trim();

  if (!topic) {
    return NextResponse.json({ error: "topic is required" }, { status: 400 });
  }

  try {
    const briefing = await generateBriefing(topic);
    return NextResponse.json({ briefing }, { status: 201 });
  } catch (e) {
    console.error("Briefing generation failed:", e);
    return NextResponse.json(
      { error: "Failed to generate briefing" },
      { status: 500 }
    );
  }
}