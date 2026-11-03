export type GeminiProjectBlock = "gemini_free_tier_ineligible" | "gemini_prepay_depleted" | "gemini_monthly_spend_cap";
export function classifyGeminiProjectBlock(provider: string | null | undefined, status: number, detail: string): GeminiProjectBlock | null {
  if (provider !== "gemini") return null;
  const message = detail.toLowerCase();
  if (status === 403 && (message.includes("free tier is not available for this project") || message.includes("your project has been denied access"))) return "gemini_free_tier_ineligible";
  if (status === 402 && message.includes("prepayment credits are depleted")) return "gemini_prepay_depleted";
  if (status === 429 && message.includes("project has exceeded its monthly spending cap")) return "gemini_monthly_spend_cap";
  return null;
}
