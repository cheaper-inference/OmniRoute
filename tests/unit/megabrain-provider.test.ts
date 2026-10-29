/**
 * MegaBrain provider: device-code OAuth (Kilo's flow on api.getmegabrain.com), dual-auth
 * API keys, the plan header on every request, key validation against the authenticated
 * limits route (its /models route is public), and the plan usage limits fetcher.
 */
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { MEGABRAIN_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import PROVIDERS from "../../src/lib/oauth/providers/index.ts";
import { supportsDualAuthProvider } from "../../src/shared/constants/providers.ts";
import { isReservedProviderPrefix } from "../../src/shared/constants/reservedProviderPrefixes.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { OAUTH_TEST_CONFIG } from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import {
  buildMegabrainUsageResult,
  getMegabrainUsage,
} from "../../open-sse/services/usage/megabrain.ts";
import { supportsProviderQuota } from "../../src/shared/utils/providerQuotaVisibility.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function recordFetch(responses: Response[]): string[] {
  const urls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    urls.push(String(url));
    const next = responses.shift();
    if (!next) throw new Error(`unexpected fetch ${String(url)}`);
    return next;
  }) as typeof fetch;
  return urls;
}

test("registry: OAuth-primary on api.getmegabrain.com, dual-auth, on the plan", () => {
  const entry = REGISTRY.megabrain;
  assert.equal(entry.id, "megabrain");
  assert.equal(entry.alias, "mb");
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, "https://api.getmegabrain.com/api/openrouter/chat/completions");
  assert.equal(entry.headers?.["X-KILOCODE-FEATURE"], "omniroute");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.models[0].id, "mb-auto/free");
  assert.ok(!entry.models.some((m) => m.id === "mb-auto/frontier"));
  assert.equal(supportsDualAuthProvider("megabrain"), true);
  // A custom provider node cannot claim either prefix.
  assert.equal(isReservedProviderPrefix("megabrain"), true);
  assert.equal(isReservedProviderPrefix("mb"), true);
  // Last in the registry, so its bare upstream ids never shadow another provider's.
  assert.equal(Object.keys(REGISTRY).at(-1), "megabrain");
});

test("device code: Kilo's flow against MegaBrain's host", async () => {
  const urls = recordFetch([
    jsonResponse({
      code: "ABCD-EFGH",
      verificationUrl: "https://app.getmegabrain.com/device-auth?code=ABCD-EFGH",
      expiresIn: 600,
    }),
    new Response("", { status: 202 }),
    jsonResponse({ status: "approved", token: "mb-token", userEmail: "dev@example.com" }),
    new Response("", { status: 403 }),
    new Response("", { status: 410 }),
  ]);
  const provider = PROVIDERS.megabrain;
  assert.equal(provider.flowType, "device_code");
  assert.equal(provider.config, MEGABRAIN_CONFIG);

  const device = await provider.requestDeviceCode(provider.config);
  assert.equal(device.user_code, "ABCD-EFGH");
  assert.equal(
    device.verification_uri_complete,
    "https://app.getmegabrain.com/device-auth?code=ABCD-EFGH"
  );
  assert.equal(device.expires_in, 600);

  const pending = await provider.pollToken(provider.config, device.device_code);
  assert.equal(pending.data.error, "authorization_pending");
  const approved = await provider.pollToken(provider.config, device.device_code);
  assert.equal(approved.ok, true);
  assert.deepEqual(provider.mapTokens(approved.data), {
    accessToken: "mb-token",
    refreshToken: null,
    expiresIn: null,
    email: "dev@example.com",
  });
  const denied = await provider.pollToken(provider.config, device.device_code);
  assert.equal(denied.data.error, "access_denied");
  const expired = await provider.pollToken(provider.config, device.device_code);
  assert.equal(expired.data.error, "expired_token");

  assert.equal(urls[0], "https://api.getmegabrain.com/api/device-auth/codes");
  assert.equal(urls[1], "https://api.getmegabrain.com/api/device-auth/codes/ABCD-EFGH");
});

test("connection test probes the authenticated limits route", () => {
  assert.equal(OAUTH_TEST_CONFIG.megabrain?.url, "https://api.getmegabrain.com/api/profile/limits");
});

// MegaBrain-faithful upstream: /models is open, /api/profile/limits is authenticated.
let server: Server;
let baseUrl = "";
let modelsRequests = 0;
let lastLimitsAuthorization: string | null = null;
const VALID_KEY = "mb-v1-valid";

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    if (path === "/api/openrouter/models") {
      modelsRequests += 1;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ data: [{ id: "z-ai/glm-5.3" }] }));
      return;
    }
    if (path === "/api/profile/limits") {
      const auth = req.headers["authorization"];
      lastLimitsAuthorization = typeof auth === "string" ? auth : null;
      if (auth !== `Bearer ${VALID_KEY}`) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid API key", success: false }));
        return;
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ plan: "free", limits: [], extraUsageEnabled: false }));
      return;
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no assigned port");
  baseUrl = `http://127.0.0.1:${address.port}/api/openrouter/chat/completions`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

test("API key validation rejects a bogus key instead of trusting the public catalog", async () => {
  modelsRequests = 0;
  const result = await validateProviderApiKey({
    provider: "megabrain",
    apiKey: "mb-v1-bogus",
    providerSpecificData: { baseUrl },
  });
  assert.equal(result.valid, false, JSON.stringify(result));
  assert.equal(modelsRequests, 0, "the public /models must not be consulted");
  assert.equal(lastLimitsAuthorization, "Bearer mb-v1-bogus");
});

test("API key validation accepts a key the limits route authenticates", async () => {
  const result = await validateProviderApiKey({
    provider: "megabrain",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });
  assert.equal(result.valid, true, JSON.stringify(result));
});

test("usage: session and weekly limits become percentage quotas", () => {
  const result = buildMegabrainUsageResult({
    plan: "pro",
    limits: [
      { id: "session", label: "Session limit", usedPct: 17, resetsAt: "2026-10-25T15:00:00Z" },
      {
        id: "weekly",
        label: "Weekly · all models",
        usedPct: 23,
        resetsAt: "2026-10-29T00:00:00.000Z",
      },
    ],
    extraUsageEnabled: true,
  });
  assert.equal(result.plan, "MegaBrain · Pro");
  assert.equal(result.extraUsageEnabled, true);
  assert.deepEqual(result.quotas.session, {
    used: 17,
    total: 100,
    remaining: 83,
    remainingPercentage: 83,
    resetAt: "2026-10-25T15:00:00.000Z",
    unlimited: false,
    fractionReported: true,
    displayName: "Session limit",
  });
  assert.equal(result.quotas.weekly.remainingPercentage, 77);
  assert.equal(result.quotas.weekly.resetAt, "2026-10-29T00:00:00.000Z");
});

test("usage: fetches the limits with the connection's token", async () => {
  const urls = recordFetch([
    jsonResponse({
      plan: "ultra",
      limits: [{ id: "weekly", label: "Weekly · all models", usedPct: 140, resetsAt: null }],
      extraUsageEnabled: false,
    }),
  ]);
  const result = (await getMegabrainUsage("mb-token")) as ReturnType<
    typeof buildMegabrainUsageResult
  >;
  assert.equal(urls[0], "https://api.getmegabrain.com/api/profile/limits");
  assert.equal(result.plan, "MegaBrain · Ultra");
  assert.equal(result.quotas.weekly.used, 100, "an overrun is clamped to 100%");
  assert.equal(result.quotas.weekly.remainingPercentage, 0);
});

test("usage: Free has no plan limits, a rejected token asks to sign in again", async () => {
  recordFetch([jsonResponse({ plan: "free", limits: [], extraUsageEnabled: false })]);
  const free = (await getMegabrainUsage("mb-token")) as { message?: string; plan?: string };
  assert.equal(free.plan, "MegaBrain · Free");
  assert.match(free.message ?? "", /no plan limits/);

  recordFetch([jsonResponse({ error: "Unauthorized", success: false }, 401)]);
  const rejected = (await getMegabrainUsage("mb-token")) as { message?: string };
  assert.match(rejected.message ?? "", /re-authenticate/);

  const missing = (await getMegabrainUsage(null)) as { message?: string };
  assert.match(missing.message ?? "", /not connected/);
});

test("usage wiring: Provider Limits shows the session and weekly bars", async () => {
  assert.equal(supportsProviderQuota("megabrain"), true);
  recordFetch([
    jsonResponse({
      plan: "pro",
      limits: [
        { id: "session", label: "Session limit", usedPct: 17, resetsAt: null },
        { id: "weekly", label: "Weekly · all models", usedPct: 23, resetsAt: null },
      ],
      extraUsageEnabled: false,
    }),
  ]);
  // An API-key connection: no OAuth token, the mb-v1 key is used instead.
  const usage = await getUsageForProvider({
    id: "conn-megabrain",
    provider: "megabrain",
    apiKey: "mb-v1-valid",
  });
  const rows = parseQuotaData("megabrain", usage) as Array<{
    name: string;
    remainingPercentage?: number;
  }>;
  assert.deepEqual(
    rows.map((row) => [row.name, row.remainingPercentage]),
    [
      ["session", 83],
      ["weekly", 77],
    ]
  );
});

// MegaBrain's refusals of a model the account cannot pay for, as the executor flattens them.
const PLAN_TIER_MESSAGE =
  "[403]: Claude, GPT and Gemini are paid from your credits: turn on Extra Usage in Billing, or move to Pro. Your plan includes GLM, Kimi, MiniMax, DeepSeek, Qwen, Grok and Auto, and your own API keys work on every plan.";
const EXTRA_USAGE_OFF_MESSAGE =
  "[403]: Extra Usage is off, so your balance does not pay for models. Turn it on in Billing to use paid models, or use the free models, local models or your own keys.";

test("a model above the plan locks that model, never bans the connection", () => {
  assert.equal(
    classifyProviderError(403, PLAN_TIER_MESSAGE, "megabrain"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  const body = JSON.stringify({
    error: { code: 403, message: "…", metadata: { megabrain_error_type: "plan_tier_required" } },
    error_type: "plan_tier_required",
  });
  assert.equal(classifyProviderError(403, body, "mb"), PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
  assert.equal(
    classifyProviderError(403, EXTRA_USAGE_OFF_MESSAGE, "megabrain"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  // The pre-2026-10-27 wording of the plan refusal still locks only the model.
  assert.equal(
    classifyProviderError(403, "[403]: Claude, GPT and Gemini come with Pro and above.", "mb"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  // A 403 that is not a plan refusal keeps the generic semantics.
  assert.equal(
    classifyProviderError(403, "[403]: Request forbidden.", "megabrain"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
  // Other providers keep their 403 semantics.
  assert.equal(
    classifyProviderError(403, PLAN_TIER_MESSAGE, "codex"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
});

test("a used-up session or week is a cooldown, not a ban", () => {
  const result = classifyProviderError(
    429,
    "[429]: Weekly limit reached; resets at 2026-10-29T00:00:00.000Z. Free models and your own keys still work, or enable Extra Usage to continue on credits.",
    "megabrain"
  );
  assert.notEqual(result, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.notEqual(result, PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
});
