const GROK_BOT_USAGE_URL =
  "https://api2.cursor.sh/aiserver.v1.DashboardService/GetSandUsageStatus";

type GrokBotUsageResponse = {
  usagePercent?: unknown;
  nextResetTimestampUtc?: unknown;
  grokPlanLabel?: unknown;
};

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

export async function getGrokBotUsage(accessToken?: string) {
  if (!accessToken) return { message: "Grok Bot usage unavailable" };

  const response = await fetch(GROK_BOT_USAGE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Connect-Protocol-Version": "1",
    },
    body: "{}",
    redirect: "error",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return { message: "Grok Bot usage unavailable" };

  const data = (await response.json()) as GrokBotUsageResponse;
  const used = numberOrNull(data.usagePercent);
  if (used === null || used < 0 || used > 100) {
    return { message: "Grok Bot usage unavailable" };
  }

  const remaining = 100 - used;
  const plan = stringOrNull(data.grokPlanLabel);
  return {
    ...(plan ? { plan } : {}),
    quotas: {
      weekly: {
        displayName: "Grok Bot",
        used,
        total: 100,
        remaining,
        remainingPercentage: remaining,
        resetAt: stringOrNull(data.nextResetTimestampUtc),
        isPercentageOnly: true,
      },
    },
  };
}
