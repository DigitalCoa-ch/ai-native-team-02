import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { runImpactAnalysis } from "@/lib/agents/impact-agent";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const startup = await prisma.startup.findUnique({
    where: { id },
    include: {
      analyses: { orderBy: { createdAt: "desc" }, take: 10 },
      fundingEvents: { orderBy: { date: "desc" }, take: 5 },
    },
  });

  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 });
  }

  return NextResponse.json({ startup });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const startup = await prisma.startup.findUnique({ where: { id } });
  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 });
  }

  const analysis = await runImpactAnalysis(id, {
    name: startup.name,
    description: startup.description,
    sector: startup.sector,
    industry: startup.industry,
    impactAreas: startup.impactArea,
  });

  return NextResponse.json({ analysis }, { status: 201 });
}