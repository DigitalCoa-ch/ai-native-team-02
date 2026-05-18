"use server";

import { discoveryPrompt, getLLM } from "./llm";
import { prisma } from "@/lib/db/prisma";

export async function discoverStartups(input: {
  query: string;
  sectors?: string[];
  impactAreas?: string[];
  limit?: number;
}) {
  const { sectors = [], impactAreas = [], limit = 10 } = input;

  const chain = discoveryPrompt.pipe(getLLM());

  const rawOutput = await chain.invoke({
    sectors: sectors.join(", ") || "all sectors",
    impact_areas: impactAreas.join(", ") || "general sustainability",
    stage: "seed through growth",
  });

  const parsed =
    typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput;
  const results = Array.isArray(parsed) ? parsed : parsed.startups ?? [];

  const created = [];
  for (const s of results.slice(0, limit)) {
    const slug = s.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const startup = await prisma.startup.upsert({
      where: { slug },
      update: {
        website: s.website,
        description: s.description,
        sector: s.sector || sectors[0] || "Sustainability",
        industry: s.industry || "General",
        impactScore: s.impact_potential
          ? Number(s.impact_potential) / 100
          : null,
      },
      create: {
        name: s.name,
        slug,
        website: s.website,
        description: s.description,
        sector: s.sector || sectors[0] || "Sustainability",
        industry: s.industry || "General",
        impactArea: s.impact_areas ?? impactAreas,
        impactScore: s.impact_potential
          ? Number(s.impact_potential) / 100
          : null,
        financialScore: 0.5,
        overallScore: s.impact_potential
          ? Number(s.impact_potential) / 100 * 0.6 + 0.5 * 0.4
          : 0.5,
      },
    });

    created.push(startup);
  }

  return created;
}