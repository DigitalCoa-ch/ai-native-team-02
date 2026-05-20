"use server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { web_search } from "@/lib/tools/web-search";

export interface RiskItem {
  description: string;
  confidence: number;
  category: "financial" | "geopolitical" | "sector";
  potentialImpact: string;
}

export interface BriefingResult {
  summary: string;
  risks: RiskItem[];
  geoContext: string | null;
  sources: string[];
}

function getLLM() {
  return new ChatOpenAI({
    modelName: process.env.OPENAI_MODEL || "gpt-4o",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY || "",
  });
}

const briefingPrompt = ChatPromptTemplate.fromTemplate(`
You are a senior financial and geopolitical risk analyst assisting stock traders.

TOPIC: {topic}
SEARCH RESULTS (recent news articles):
{searchResults}

TASK:
1. Provide a 2-3 sentence succinct summary of what this topic covers right now
2. Identify and rank the key risks (most likely to least likely) 
3. For each risk, assign a confidence level (0.0 to 1.0), a category, and a potential market impact
4. Provide brief geopolitical context if relevant to the topic

Return a JSON object with this structure:
{
  "summary": "2-3 sentence summary",
  "risks": [
    {
      "description": "risk description",
      "confidence": 0.0-1.0,
      "category": "financial" | "geopolitical" | "sector",
      "potentialImpact": "how this affects markets"
    }
  ],
  "geoContext": "brief geopolitical context or null",
  "sources": ["source 1", "source 2"]
}

Prioritize financial risks. Only include geopolitical context if directly relevant to market performance.
`);

async function searchNews(query: string): Promise<{ title: string; url: string; snippet?: string }[]> {
  try {
    const results = await web_search({ query, count: 8 });
    return results;
  } catch {
    return [];
  }
}

export async function generateBriefing(topic: string): Promise<BriefingResult> {
  const searchResults = await searchNews(`${topic} news 2026`);

  const searchText = searchResults
    .map(
      (r) =>
        `Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet ?? ""}`
    )
    .join("\n\n");

  const chain = briefingPrompt.pipe(getLLM());
  const raw = await chain.invoke({ topic, searchResults: searchText });

  let parsed: Record<string, unknown>;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, unknown>);
  } catch {
    throw new Error("Failed to parse LLM response");
  }

  return {
    summary: (parsed.summary as string) ?? "",
    risks: (parsed.risks as RiskItem[]) ?? [],
    geoContext: parsed.geoContext as string | null ?? null,
    sources: (parsed.sources as string[]) ?? searchResults.map((r) => r.url),
  };
}