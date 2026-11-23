/** Included allowance alone cannot establish account headroom while purchased credits remain. */
export function hasOllamaPurchasedCredits(usage: unknown, provider?: string | null): boolean {
  if (provider !== "ollama-cloud") return false;
  if (!usage || typeof usage !== "object") return false;
  const quotas = (usage as Record<string, unknown>).quotas;
  if (!quotas || typeof quotas !== "object") return false;
  const credits = (quotas as Record<string, unknown>).credits;
  if (!credits || typeof credits !== "object") return false;
  const balance = credits as Record<string, unknown>;
  return (
    balance.ollamaApiBalance === true &&
    balance.currency === "USD" &&
    typeof balance.remaining === "number" &&
    Number.isFinite(balance.remaining) &&
    balance.remaining > 0
  );
}
