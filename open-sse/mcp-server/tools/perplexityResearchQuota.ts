import { tlsFetchPerplexity } from "../../services/perplexityTlsClient.ts";

const RATE_LIMIT_URL = "https://www.perplexity.ai/rest/rate-limit/all";

// Reads the account's remaining Deep Research runs. Returns null when the
// lookup throws, answers with a non-200 status, or carries no number, so the
// caller goes ahead with the run.
export async function remainingResearch(headers: Record<string, string>): Promise<number | null> {
  let res: Awaited<ReturnType<typeof tlsFetchPerplexity>>;
  try {
    res = await tlsFetchPerplexity(RATE_LIMIT_URL, { method: "GET", headers });
  } catch {
    return null;
  }
  if (res.status !== 200) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(res.text ?? "");
  } catch {
    return null;
  }
  const value = (parsed as { remaining_research?: unknown }).remaining_research;
  return typeof value === "number" ? value : null;
}
