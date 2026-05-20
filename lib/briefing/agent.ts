"use server";

import { ChatOpenAI } from "@langchain/openai";

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

async function webSearch(query: string): Promise<{ title: string; url: string; snippet?: string }[]> {
  try {
    const { web_search } = await import("@/lib/tools/web-search");
    return web_search({ query, count: 8 });
  } catch {
    return [];
  }
}

export async function generateBriefing(topic: string): Promise<BriefingResult> {
  const results = await webSearch(`${topic} news 2026`);
  const searchText = results.map((r) => `Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet ?? ""}`).join("\n\n");

  const prompt = `You are a senior financial and geopolitical risk analyst. TOPIC: ${topic}\nSEARCH RESULTS:\n${searchText}\n\nProvide a JSON response with this structure (no markdown, just plain JSON):\n{\n  "summary": "2-3 sentence summary",\n  "risks": [{"description": "...", "confidence": 0.0-1.0, "category": "financial|geopolitical|sector", "potentialImpact": "..."}],\n  "geoContext": "context or null",\n  "sources": ["url1"]\n}`;

  const llm = new ChatOpenAI({ modelName: "gpt-4o", temperature: 0.3, openAIApiKey: process.env.OPENAI_API_KEY ?? "" });
  const response = await llm.invoke(prompt);

  let text = "";
  if (typeof response === "string") text = response;
  else if (response && typeof response === "object" && "text" in response) text = String((response as { text: unknown }).text);
  else if (response && typeof response === "object") text = String(response);

  // Strip markdown code blocks if present
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/m, "").replace(/\s*```$/, "").trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Failed to parse LLM response: " + text.slice(0, 200));
  }

  return {
    summary: (parsed.summary as string) ?? "",
    risks: (parsed.risks as RiskItem[]) ?? [],
    geoContext: (parsed.geoContext as string | null) ?? null,
    sources: (parsed.sources as string[]) ?? results.map((r) => r.url),
  };
}