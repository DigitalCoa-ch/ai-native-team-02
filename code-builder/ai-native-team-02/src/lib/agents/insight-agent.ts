"use server";

import { getLLM } from "./llm";
import { prisma } from "@/lib/db/prisma";

export async function generateInsights(investorId: string, focus: string = "all") {
  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
    include: {
      watchlists: { include: { startup: true } },
    },
  });

  if (!investor) throw new Error("Investor not found");

  const ownedIds = investor.watchlists.map((w) => w.startupId);

  const startups =
    focus === "portfolio"
      ? await prisma.startup.findMany({ where: { id: { in: ownedIds } } })
      : await prisma.startup.findMany({
          where: ownedIds.length ? { id: { notIn: ownedIds } } : undefined,
          orderBy: { overallScore: "desc" },
          take: 20,
        });

  if (startups.length === 0) {
    return { insights: [], message: "Not enough startup data for insights." };
  }

  const context = startups
    .map(
      (s) =>
        `${s.name} (${s.sector}/${s.industry}): ${s.description}. Impact: ${s.impactScore}/Financial: ${s.financialScore}`
    )
    .join("\n");

  const prompt = `You are a senior investment insights analyst. Based on the following startup data, generate 5-7 actionable investor insights.

Context: An investor focused on ${investor.firm ?? "impact investing"}.

Startups:
${context}

Return a JSON object with:
- insights: array of { title, description, sector, confidence, action }
- market_themes: array of strings describing overarching trends
- gaps: array of strings describing portfolio gaps or underserved areas
`;

  const raw = await getLLM().invoke(prompt);
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

  return {
    insights: parsed.insights ?? [],
    marketThemes: parsed.market_themes ?? [],
    gaps: parsed.gaps ?? [],
    generatedAt: new Date(),
  };
}