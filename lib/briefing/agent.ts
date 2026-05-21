"use server";

import { Groq } from "groq-sdk";

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

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY ?? "" });
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 2048,
  });

  const text = response.choices[0]?.message?.content ?? "";

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