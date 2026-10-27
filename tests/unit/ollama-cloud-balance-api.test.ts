import test from "node:test";
import assert from "node:assert/strict";

const { getOllamaCloudUsage } = await import("../../open-sse/services/opencodeOllamaUsage.ts");
const { parseQuotaData } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts");
const { convertUsageToQuotaInfo } = await import("../../open-sse/services/genericQuotaFetcher.ts");

const BALANCE_URL = "https://ollama.com/api/balance";
const SETTINGS_URL = "https://ollama.com/settings";
const COOKIE_ENV_KEYS = [
  "OMNIROUTE_OLLAMA_USAGE_COOKIE",
  "OLLAMA_USAGE_COOKIE",
  "OLLAMA_CLOUD_USAGE_COOKIE",
];

type Quota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
  currency?: string;
};
type UsageResult = { plan?: string; message?: string; quotas?: Record<string, Quota> };
type Call = { url: string; headers: Headers };

// https://docs.ollama.com/api/balance — standard (monthly credit) plan example.
const MONTHLY_BALANCE = {
  included: {
    balance_usd: 72.5,
    allowance_usd: 100,
    period: { from: "2099-09-15T09:30:00Z", until: "2099-10-15T09:30:00Z" },
  },
  purchased: { balance_usd: 25 },
};

// https://docs.ollama.com/api/balance — legacy plan example.
const LEGACY_BALANCE = {
  included: {
    session: { remaining_percent: 40, resets_at: "2026-10-01T07:00:00Z" },
    weekly: { remaining_percent: 140, resets_at: "2026-10-05T00:00:00Z" },
  },
  purchased: { balance_usd: 0 },
};

const SETTINGS_HTML = [
  '<span class="capitalize">pro</span>',
  '<div data-usage-track aria-label="34% used"></div>',
  '<span class="local-time" data-time="2026-06-22T15:00:00.000Z"></span>',
].join("");

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function run(
  args: { apiKey?: string; cookie?: string },
  respond: (url: string) => Response
): Promise<{ calls: Call[]; result: UsageResult }> {
  const saved = COOKIE_ENV_KEYS.map((k) => [k, process.env[k]] as const);
  for (const k of COOKIE_ENV_KEYS) delete process.env[k];
  const originalFetch = globalThis.fetch;
  const calls: Call[] = [];
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, headers: new Headers(init?.headers as HeadersInit) });
    return respond(url);
  }) as typeof fetch;
  try {
    const psd = args.cookie ? { ollamaCloudUsageCookie: args.cookie } : undefined;
    const result = (await getOllamaCloudUsage(psd, args.apiKey)) as UsageResult;
    return { calls, result };
  } finally {
    globalThis.fetch = originalFetch;
    for (const [k, v] of saved) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

test("API key without a cookie reads GET /api/balance with a Bearer token", async () => {
  const { calls, result } = await run({ apiKey: "ok-key" }, () => json(MONTHLY_BALANCE));

  assert.equal(result.message, undefined);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, BALANCE_URL);
  assert.equal(calls[0].headers.get("Authorization"), "Bearer ok-key");
  assert.equal(calls[0].headers.get("Accept"), "application/json");
  assert.equal(result.plan, "Ollama Cloud");
});

test("monthly allowance maps to a percent row resetting at period.until", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => json(MONTHLY_BALANCE));
  const monthly = result.quotas?.monthly;

  assert.ok(monthly, "expected a monthly quota row");
  assert.equal(monthly.used, 27.5);
  assert.equal(monthly.total, 100);
  assert.equal(monthly.remainingPercentage, 72.5);
  assert.equal(monthly.resetAt, "2099-10-15T09:30:00Z");
  assert.equal(monthly.unlimited, false);
  assert.equal(monthly.displayName, "Monthly");
});

test("purchased credits become a USD credit-balance row; zero yields no row", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => json(MONTHLY_BALANCE));
  const credits = result.quotas?.credits;
  assert.ok(credits, "expected a credits row for purchased balance");
  assert.equal(credits.remaining, 25);
  assert.equal(credits.currency, "USD");
  assert.equal(credits.total, 0);
  assert.equal(credits.remainingPercentage, undefined);

  const zero = await run({ apiKey: "ok-key" }, () => json(LEGACY_BALANCE));
  assert.equal(zero.result.quotas?.credits, undefined);
});

test("legacy session/weekly windows keep their keys and clamp to 0..100", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => json(LEGACY_BALANCE));

  assert.deepEqual(Object.keys(result.quotas ?? {}).sort(), ["session", "weekly"]);
  assert.equal(result.quotas!.session.used, 60);
  assert.equal(result.quotas!.session.remainingPercentage, 40);
  assert.equal(result.quotas!.session.resetAt, "2026-10-01T07:00:00Z");
  assert.equal(result.quotas!.weekly.used, 0);
  assert.equal(result.quotas!.weekly.remainingPercentage, 100);
  assert.equal(result.quotas!.weekly.resetAt, "2026-10-05T00:00:00Z");
});

test("allowance_usd 0 produces no monthly row", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () =>
    json({
      included: { balance_usd: 0, allowance_usd: 0 },
      purchased: { balance_usd: 3 },
    })
  );
  assert.equal(result.quotas?.monthly, undefined);
  assert.equal(result.quotas?.credits?.remaining, 3);
});

test("unknown balance shape falls back to the cookie scraper when a cookie exists", async () => {
  const { calls, result } = await run({ apiKey: "ok-key", cookie: "abc" }, (url) =>
    url === BALANCE_URL ? json({ something: "else" }) : new Response(SETTINGS_HTML)
  );

  assert.deepEqual(
    calls.map((c) => c.url),
    [BALANCE_URL, SETTINGS_URL]
  );
  assert.equal(calls[1].headers.get("Authorization"), null);
  assert.equal(result.quotas?.session?.used, 34);
  assert.equal(result.plan, "Ollama Cloud pro");
});

test("401 reports an authentication failure without leaking the key or a stack", async () => {
  const { calls, result } = await run({ apiKey: "secret-key-123" }, () =>
    json({ error: "unauthorized" }, 401)
  );

  assert.equal(calls.length, 1);
  assert.match(result.message ?? "", /Ollama Cloud/);
  assert.match(result.message ?? "", /401/);
  assert.match(result.message ?? "", /API key/i);
  assert.ok(!(result.message ?? "").includes("secret-key-123"));
  assert.ok(!(result.message ?? "").includes("at /"));
});

test("network failure is reported sanitized when no cookie fallback exists", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => {
    throw new Error("connect ECONNREFUSED");
  });
  assert.match(result.message ?? "", /Ollama Cloud/);
  assert.ok(!(result.message ?? "").includes("at /"));
});

test("dashboard parser renders the purchased credits row as USD credits", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => json(MONTHLY_BALANCE));
  const rows = parseQuotaData("ollama-cloud", result) as Array<{
    name: string;
    isCredits?: boolean;
    creditCount?: number;
    currency?: string;
    remainingPercentage?: number;
    displayName?: string;
  }>;

  const credits = rows.find((r) => r.name === "credits");
  assert.ok(credits, "expected a credits row");
  assert.equal(credits.isCredits, true);
  assert.equal(credits.creditCount, 25);
  assert.equal(credits.currency, "USD");

  const monthly = rows.find((r) => r.name === "monthly");
  assert.ok(monthly, "expected a monthly row");
  assert.equal(monthly.isCredits, undefined);
  assert.equal(monthly.remainingPercentage, 72.5);
  assert.equal(monthly.displayName, "Monthly");
});

test("preflight keeps total headroom unknown while purchased credits remain", async () => {
  const { result } = await run({ apiKey: "ok-key" }, () => json(MONTHLY_BALANCE));
  const info = convertUsageToQuotaInfo(result, { provider: "ollama-cloud" });

  assert.equal(info, null);
});
