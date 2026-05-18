import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export function getLLM() {
  return new ChatOpenAI({
    modelName: process.env.OPENAI_MODEL || "gpt-4o",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY || "sk-dummy",
  });
}

export const startupAnalysisPrompt = ChatPromptTemplate.fromTemplate(`
You are an expert investment analyst specializing in sustainability and impact investing.

Given the following startup data, provide a comprehensive analysis.

Startup: {startup_name}
Description: {description}
Sector: {sector}
Industry: {industry}
Impact Areas: {impact_areas}

Return a JSON object with:
- summary: A 2-3 sentence executive summary
- key_findings: Array of 4-5 key investment highlights
- risk_factors: Array of 3-4 potential risks
- recommendations: Array of 2-3 actionable recommendations
- impact_score: A score from 0-100 for sustainability impact
- financial_score: A score from 0-100 for financial viability
`);

export const discoveryPrompt = ChatPromptTemplate.fromTemplate(`
You are a startup discovery agent. Search for startups matching these criteria:

Sectors: {sectors}
Impact Areas: {impact_areas}
Investment Stage: {stage}

Return a JSON array of startup objects with:
- name, website, description, sector, industry, impact_areas
- estimated_funding_stage: "pre-seed" | "seed" | "series-a" | "series-b" | "growth"
- impact_potential: score 0-100
`);