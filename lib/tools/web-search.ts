import { tavily } from "@tavily/core";

interface SearchResult {
  title: string;
  url: string;
  snippet?: string;
}

export async function web_search(args: { query: string; count?: number }): Promise<SearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    console.warn("TAVILY_API_KEY not set — skipping web search");
    return [];
  }

  try {
    const client = tavily({ apiKey });
    const response = await client.search(args.query, {
      maxResults: args.count ?? 8,
      searchDepth: "advanced",
      topic: "news",
    });

    return response.results.map((result) => ({
      title: result.title,
      url: result.url,
      snippet: result.content,
    }));
  } catch (err) {
    console.error("Tavily search failed:", err);
    return [];
  }
}