// Stub — the real implementation is injected via environment or Vercel secrets
interface SearchResult {
  title: string;
  url: string;
  snippet?: string;
}

export async function web_search(args: { query: string; count?: number }): Promise<SearchResult[]> {
  // Return empty results — real search is handled server-side via API keys set in Vercel
  console.warn("web_search called without real backend, returning empty results");
  return [];
}
