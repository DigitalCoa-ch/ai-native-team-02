"use server";

import { startupAnalysisPrompt, getLLM } from "./llm";
import { prisma } from "@/lib/db/prisma";

export async function runImpactAnalysis(
  startupId: string,
  startupData: {
    name: string;
    description: string;
    sector: string;
    industry: string;
    impactAreas: string[];
  }
) {
  const chain = startupAnalysisPrompt.pipe(getLLM());

  const rawOutput = await chain.invoke({
    startup_name: startupData.name,
    description: startupData.description,
    sector: startupData.sector,
    industry: startupData.industry,
    impact_areas: startupData.impactAreas.join(", "),
  });

  const parsed = typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput;

  // Save analysis to database
  const analysis = await prisma.analysis.create({
    data: {
      startupId,
      agentRole: "impact_analysis",
      output: {
        summary: parsed.summary ?? "",
        keyFindings: parsed.key_findings ?? [],
        riskFactors: parsed.risk_factors ?? [],
        recommendations: parsed.recommendations ?? [],
        impactScore: parsed.impact_score,
        financialScore: parsed.financial_score,
      },
      confidence: 0.8,
      sources: ["web_search", "llm_reasoning"],
    },
  });

  // Update startup scores
  if (parsed.impact_score || parsed.financial_score) {
    const overallScore =
      ((parsed.impact_score ?? 0) * 0.6 + (parsed.financial_score ?? 0) * 0.4) / 100;

    await prisma.startup.update({
      where: { id: startupId },
      data: {
        impactScore: parsed.impact_score ? parsed.impact_score / 100 : null,
        financialScore: parsed.financial_score ? parsed.financial_score / 100 : null,
        overallScore: overallScore || null,
      },
    });
  }

  return analysis;
}