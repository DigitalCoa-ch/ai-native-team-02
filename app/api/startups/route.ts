import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get("sector");
  const industry = searchParams.get("industry");
  const minImpact = searchParams.get("minImpact");
  const sortBy = searchParams.get("sortBy") || "overallScore";
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);

  const startups = await prisma.startup.findMany({
    where: {
      ...(sector && { sector }),
      ...(industry && { industry }),
      ...(minImpact && { impactScore: { gte: Number(minImpact) / 100 } }),
    },
    orderBy:
      sortBy === "impactScore"
        ? { impactScore: "desc" }
        : sortBy === "financialScore"
        ? { financialScore: "desc" }
        : { overallScore: "desc" },
    take: limit,
  });

  return NextResponse.json({ startups });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const startup = await prisma.startup.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      website: body.website,
      description: body.description,
      longDescription: body.longDescription,
      sector: body.sector,
      industry: body.industry,
      impactArea: body.impactArea ?? [],
      hq: body.hq,
      foundedYear: body.foundedYear,
      size: body.size,
      logoUrl: body.logoUrl,
      crunchbaseId: body.crunchbaseId,
    },
  });

  return NextResponse.json({ startup }, { status: 201 });
}