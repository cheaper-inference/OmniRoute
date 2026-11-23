/**
 * Ollama Cloud quota via the documented, API-key authenticated balance endpoint.
 *
 * GET https://ollama.com/api/balance (https://docs.ollama.com/api/balance)
 *   - Standard plans: `included.balance_usd` of `included.allowance_usd`, resetting at
 *     `included.period.until` → `monthly` percent window.
 *   - Legacy plans: `included.session` / `included.weekly` with `remaining_percent` (0..100)
 *     and `resets_at` → the same `session` / `weekly` keys the settings scraper produces.
 *   - `purchased.balance_usd` → `credits` USD credit-balance row (only when > 0).
 */

export type OllamaCloudQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
  currency?: string;
  ollamaApiBalance?: true;
};

export type OllamaCloudBalanceResult =
  | { quotas: Record<string, OllamaCloudQuota>; message?: undefined }
  | { quotas: null; message: string };

const OLLAMA_CLOUD_BALANCE_URL =
  process.env.OMNIROUTE_OLLAMA_CLOUD_BALANCE_URL ?? "https://ollama.com/api/balance";

const LEGACY_WINDOWS = [
  ["session", "Session"],
  ["weekly", "Weekly"],
] as const;

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function finiteNumber(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function percentQuota(
  remainingPercent: number,
  resetAt: unknown,
  displayName: string
): OllamaCloudQuota {
  const remaining = Math.round(Math.max(0, Math.min(100, remainingPercent)) * 10) / 10;
  const used = Math.round((100 - remaining) * 10) / 10;
  return {
    used,
    total: 100,
    remaining,
    remainingPercentage: remaining,
    resetAt: typeof resetAt === "string" && resetAt ? resetAt : null,
    unlimited: false,
    displayName,
    ollamaApiBalance: true,
  };
}

function monthlyQuota(included: JsonRecord): OllamaCloudQuota | null {
  const allowance = finiteNumber(included.allowance_usd);
  const balance = finiteNumber(included.balance_usd);
  if (allowance === null || allowance <= 0 || balance === null) return null;
  return percentQuota((balance / allowance) * 100, asRecord(included.period).until, "Monthly");
}

/** Maps an `/api/balance` payload to usage quota rows. Returns `{}` for an unknown shape. */
export function parseOllamaCloudBalance(data: unknown): Record<string, OllamaCloudQuota> {
  const root = asRecord(data);
  const included = asRecord(root.included);
  const quotas: Record<string, OllamaCloudQuota> = {};

  const monthly = monthlyQuota(included);
  if (monthly) quotas.monthly = monthly;

  for (const [key, label] of LEGACY_WINDOWS) {
    const window = asRecord(included[key]);
    const remaining = finiteNumber(window.remaining_percent);
    if (remaining === null) continue;
    quotas[key] = percentQuota(remaining, window.resets_at, label);
  }

  const purchased = finiteNumber(asRecord(root.purchased).balance_usd);
  if (purchased !== null && purchased > 0) {
    quotas.credits = {
      used: 0,
      total: 0,
      remaining: purchased,
      resetAt: null,
      unlimited: false,
      currency: "USD",
      ollamaApiBalance: true,
    };
  }

  return quotas;
}

function describeBalanceHttpError(status: number): string {
  if (status === 401) {
    return "Ollama Cloud authentication failed (HTTP 401). Check the API key.";
  }
  if (status === 403) return "Ollama Cloud account is suspended (HTTP 403).";
  if (status === 429) return "Ollama Cloud balance is rate limited (HTTP 429). Try again later.";
  return `Ollama Cloud balance error (HTTP ${status}).`;
}

/** Fetches `/api/balance` with the connection's API key. Network errors propagate. */
export async function fetchOllamaCloudBalance(apiKey: string): Promise<OllamaCloudBalanceResult> {
  const response = await fetch(OLLAMA_CLOUD_BALANCE_URL, {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return { quotas: null, message: describeBalanceHttpError(response.status) };

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  const quotas = parseOllamaCloudBalance(payload);
  if (Object.keys(quotas).length === 0) {
    return { quotas: null, message: "Ollama Cloud balance response contained no quota data." };
  }
  return { quotas };
}
