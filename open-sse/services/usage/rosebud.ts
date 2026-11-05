/** Read the last verified CLI account snapshot without spawning from a remote quota request. */
export function getRosebudUsage(data: Record<string, unknown> = {}) {
  const identity = data.rosebudAccount as
    { status?: string; account?: { display_name?: string; balance?: number } } | undefined;
  return {
    plan: "Rosebud subscription",
    quotas: {},
    accountName: identity?.account?.display_name,
    authStatus: identity?.status || "unknown",
    remainingCredits: identity?.account?.balance ?? null,
    creditUnit: "rosebud_credits",
    usdCost: null,
    updatedAt: data.rosebudLastChecked || null,
    message:
      "Native Rosebud credits. Refresh authorization and credits on the Rosebud provider page for a live balance.",
  };
}
