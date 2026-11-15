/** Mistral billing budget sections are independent quota windows on the same API key. */
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import { clampPercentage, roundCurrency, toNumber, toRecord } from "./scalars.ts";

const MISTRAL_BUDGET_URL = "https://api.mistral.ai/v1/billing/budget";
const DEFAULT_CONSOLE_BASE_URL = "https://console.mistral.ai";
const FETCH_TIMEOUT_MS = 10_000;

type BudgetQuota = UsageQuota & { paygEnabled?: boolean };

function budgetRow(section: Record<string, unknown>, displayName: string): BudgetQuota {
  const total = Math.max(0, toNumber(section.initial_budget, 0));
  const usedPercentage = clampPercentage(toNumber(section.usage_percentage, 0));
  const used = roundCurrency((total * usedPercentage) / 100);
  const remaining = roundCurrency(Math.max(0, total - used));
  const currency =
    typeof section.currency === "string" && /^[A-Za-z]{3}$/.test(section.currency)
      ? section.currency.toUpperCase()
      : undefined;

  return {
    displayName,
    used,
    total,
    remaining,
    remainingPercentage: 100 - usedPercentage,
    resetAt: parseResetTime(section.reset_at),
    unlimited: false,
    ...(currency ? { currency } : {}),
    ...(typeof section.payg_enabled === "boolean" ? { paygEnabled: section.payg_enabled } : {}),
  };
}

function consoleBaseUrl(providerSpecificData?: Record<string, unknown>): string {
  const configured =
    providerSpecificData?.consoleBaseUrl ?? providerSpecificData?.mistralConsoleBaseUrl;
  if (typeof configured !== "string") return DEFAULT_CONSOLE_BASE_URL;
  try {
    const parsed = new URL(configured.trim());
    // Never forward a credential to URL userinfo, non-HTTPS schemes, or a URL with
    // embedded query/fragment parameters. The override is independent of the API host.
    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      return DEFAULT_CONSOLE_BASE_URL;
    }
    // A console override selects a host, not a caller-supplied URL path.
    return parsed.origin;
  } catch {
    return DEFAULT_CONSOLE_BASE_URL;
  }
}

function mistralPlan(data: Record<string, unknown>): string | undefined {
  const type =
    typeof data.plan_type === "string"
      ? data.plan_type
          .trim()
          .toUpperCase()
          .replace(/[\s-]+/g, "_")
      : "";
  const name = typeof data.plan_name === "string" ? data.plan_name.trim().toUpperCase() : "";
  const tier: Record<string, string> = {
    FREE: "Free",
    INDIVIDUAL: "Pro",
    EDU: "Student",
    TEAM: "Team",
  };
  const label = tier[name];
  if (type === "CHAT") return label;
  if (type === "API") return label ? `API ${label}` : "API";
  if (["MISTRAL_CODE", "MISTRALCODE", "CODE", "VIBE"].includes(type)) {
    return label ? `Mistral Code ${label}` : "Mistral Code";
  }
  // Unknown values are never echoed: whoami can return arbitrary untrusted strings.
  return undefined;
}

async function fetchMistralPlan(
  apiKey: string,
  providerSpecificData?: Record<string, unknown>
): Promise<string | undefined> {
  try {
    const response = await fetch(`${consoleBaseUrl(providerSpecificData)}/api/vibe/whoami`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return undefined;
    return mistralPlan(toRecord(await response.json()));
  } catch {
    // This optional lookup must never suppress budgets or expose an upstream body.
    return undefined;
  }
}

export async function getMistralUsage(
  apiKey: string,
  providerSpecificData?: Record<string, unknown>,
  options: { includePlan?: boolean } = {}
): Promise<{
  plan?: string;
  quotas?: Record<string, BudgetQuota>;
  message?: string;
}> {
  if (!apiKey) {
    return { message: "Mistral API key not available. Add a key to view usage." };
  }

  try {
    const response = await fetch(MISTRAL_BUDGET_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) {
      return {
        message:
          response.status === 401
            ? "Invalid Mistral API key."
            : `Mistral quota API error (${response.status})`,
      };
    }

    const data = toRecord(await response.json());
    const quotas: Record<string, BudgetQuota> = {};
    // Do not map the duplicated top-level budget fields: only actual sections are rows.
    for (const [key, label] of [
      ["vibe_budget", "Vibe budget"],
      ["api_budget", "API budget"],
    ] as const) {
      const section = data[key];
      if (section && typeof section === "object" && !Array.isArray(section)) {
        quotas[key] = budgetRow(toRecord(section), label);
      }
    }
    if (Object.keys(quotas).length === 0) {
      return { message: "Mistral connected. No budget data was returned for this key." };
    }

    const plan = options.includePlan
      ? await fetchMistralPlan(apiKey, providerSpecificData)
      : undefined;
    return { ...(plan ? { plan } : {}), quotas };
  } catch {
    // Upstream/network exceptions can contain the bearer token or private paths.
    return { message: sanitizeErrorMessage("Mistral connected. Unable to fetch usage.") };
  }
}
