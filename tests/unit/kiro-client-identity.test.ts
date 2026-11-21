/**
 * Kiro client identity (#19607 follow-up): one Kiro IDE version for every Kiro request, a
 * stable per-connection machineId, operator overrides that cannot pin a stale identity, and
 * a catalog request shaped like the Kiro IDE's own.
 *
 * Reference: Kiro IDE 1.4.178 (agent extension 1.1.939). Its User-Agent is
 * `KiroIDE-<version>-<machineId>` on both the runtime and streaming clients, and its
 * ListAvailableModels sends `origin` + `profileArn` and follows `nextToken` up to 10 pages.
 * Live, 2026-11-16 (IdC, us-east-1): inference passes the version gate with or without the
 * machineId suffix; the profileArn catalog call returns 22 models from US egress and 9 (no
 * Claude) from an unsupported region, and Claude inference from there answers INVALID_MODEL_ID.
 */
import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  KIRO_IDE_VERSION_PIN,
  buildKiroUserAgentHeaders,
  getKiroIdeVersion,
} from "../../open-sse/config/kiroClientIdentity.ts";
import { kiroMachineId } from "../../open-sse/services/kiroMachineId.ts";
import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import {
  clearKiroModelCache,
  fetchKiroAvailableModels,
} from "../../open-sse/services/kiroModels.ts";
import { getKiroUsage } from "../../open-sse/services/usage/kiro.ts";
import { discoverKiroProfileArnAcrossRegions } from "../../open-sse/services/kiroRegion.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

beforeEach(() => {
  clearKiroModelCache();
});

type Headers = Record<string, string>;

async function withEnv<T>(vars: Record<string, string | undefined>, fn: () => Promise<T> | T) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(vars)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/** The `KiroIDE-...` token of a User-Agent: version plus the optional machineId suffix. */
function kiroTag(ua: string | undefined): string | null {
  return String(ua ?? "").match(/KiroIDE-\S+/)?.[0] ?? null;
}

function header(headers: Headers, name: string): string | undefined {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : undefined;
}

const IDC_US_EAST = { authMethod: "idc", region: "us-east-1" };

async function captureExecute(
  credentials: Record<string, unknown>,
  respond: () => Response = () => new Response("ok", { status: 200 }),
  log?: { warn?: (tag: string, message: string) => void }
): Promise<Array<{ url: string; headers: Headers }>> {
  const executor = new KiroExecutor();
  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; headers: Headers }> = [];
  globalThis.fetch = (async (url: URL | string, init?: RequestInit) => {
    seen.push({ url: String(url), headers: { ...((init?.headers ?? {}) as Headers) } });
    return respond();
  }) as typeof fetch;
  try {
    await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials,
      log,
    } as Parameters<KiroExecutor["execute"]>[0]);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return seen;
}

// ── version ────────────────────────────────────────────────────────────────

test("getKiroIdeVersion defaults to the pinned Kiro IDE release", async () => {
  await withEnv({ KIRO_IDE_VERSION: undefined }, () => {
    assert.equal(getKiroIdeVersion(), KIRO_IDE_VERSION_PIN);
  });
});

test("KIRO_IDE_VERSION moves the identity forward without a release", async () => {
  await withEnv({ KIRO_IDE_VERSION: "9.1.2" }, () => {
    assert.equal(getKiroIdeVersion(), "9.1.2");
  });
});

test("KIRO_IDE_VERSION at or below the pin, or malformed, is ignored", async () => {
  // Kiro only raises its floor, so an older value can only be a stale .env entry.
  for (const stale of ["0.10.32", "1.4.121", KIRO_IDE_VERSION_PIN, "latest", "1.4", " "]) {
    await withEnv({ KIRO_IDE_VERSION: stale }, () => {
      assert.equal(getKiroIdeVersion(), KIRO_IDE_VERSION_PIN, `value ${JSON.stringify(stale)}`);
    });
  }
});

// ── machineId ──────────────────────────────────────────────────────────────

test("kiroMachineId is a stable 64-hex id per connection", () => {
  const a = kiroMachineId("11111111-1111-4111-8111-111111111111");
  assert.match(a ?? "", /^[0-9a-f]{64}$/);
  assert.equal(kiroMachineId("11111111-1111-4111-8111-111111111111"), a);
  assert.notEqual(kiroMachineId("22222222-2222-4222-8222-222222222222"), a);
});

test("kiroMachineId is absent without a connection id", () => {
  for (const missing of [undefined, null, "", "   ", 42]) {
    assert.equal(kiroMachineId(missing), undefined);
  }
});

test("buildKiroUserAgentHeaders appends the machineId like the Kiro IDE", async () => {
  await withEnv({ KIRO_IDE_VERSION: undefined }, () => {
    const withId = buildKiroUserAgentHeaders({ machineId: "abc" });
    assert.equal(kiroTag(withId["User-Agent"]), `KiroIDE-${KIRO_IDE_VERSION_PIN}-abc`);
    assert.equal(
      withId["X-Amz-User-Agent"],
      `aws-sdk-js/1.0.0 KiroIDE-${KIRO_IDE_VERSION_PIN}-abc`
    );
    const withoutId = buildKiroUserAgentHeaders();
    assert.equal(kiroTag(withoutId["User-Agent"]), `KiroIDE-${KIRO_IDE_VERSION_PIN}`);
  });
});

// ── inference ──────────────────────────────────────────────────────────────

test("inference sends the connection's machineId, unchanged across token refreshes", async () => {
  const connectionId = "33333333-3333-4333-8333-333333333333";
  const first = await captureExecute({
    accessToken: "token-before-refresh",
    connectionId,
    providerSpecificData: IDC_US_EAST,
  });
  const second = await captureExecute({
    accessToken: "token-after-refresh",
    connectionId,
    providerSpecificData: IDC_US_EAST,
  });
  const expected = `KiroIDE-${KIRO_IDE_VERSION_PIN}-${kiroMachineId(connectionId)}`;
  assert.equal(kiroTag(header(first[0].headers, "User-Agent")), expected);
  assert.equal(kiroTag(header(first[0].headers, "X-Amz-User-Agent")), expected);
  assert.equal(kiroTag(header(second[0].headers, "User-Agent")), expected);
});

test("two connections send different machineIds", async () => {
  const a = await captureExecute({
    accessToken: "t",
    connectionId: "conn-a",
    providerSpecificData: IDC_US_EAST,
  });
  const b = await captureExecute({
    accessToken: "t",
    connectionId: "conn-b",
    providerSpecificData: IDC_US_EAST,
  });
  assert.notEqual(
    kiroTag(header(a[0].headers, "User-Agent")),
    kiroTag(header(b[0].headers, "User-Agent"))
  );
});

test("inference reads KIRO_IDE_VERSION at request time", async () => {
  await withEnv({ KIRO_IDE_VERSION: "9.1.2" }, async () => {
    const [call] = await captureExecute({
      accessToken: "t",
      connectionId: "conn-version",
      providerSpecificData: IDC_US_EAST,
    });
    assert.equal(
      kiroTag(header(call.headers, "User-Agent")),
      `KiroIDE-9.1.2-${kiroMachineId("conn-version")}`
    );
  });
});

test("a stale KIRO_USER_AGENT from an old .env does not pin a gated identity", async () => {
  // .env.example used to ship KIRO_USER_AGENT uncommented, so old installs carry these.
  for (const stale of [
    "AWS-SDK-JS/3.0.0 kiro-ide/1.0.0",
    "aws-sdk-js/1.0.0 ua/2.1 os/windows#10.0.26200 lang/js md/nodejs#22.21.1 api/codewhispererstreaming#1.0.0 m/E KiroIDE-1.4.121",
  ]) {
    await withEnv({ KIRO_USER_AGENT: stale }, async () => {
      const [call] = await captureExecute({
        accessToken: "t",
        connectionId: "conn-stale",
        providerSpecificData: IDC_US_EAST,
      });
      assert.equal(
        kiroTag(header(call.headers, "User-Agent")),
        `KiroIDE-${KIRO_IDE_VERSION_PIN}-${kiroMachineId("conn-stale")}`,
        `stale override ${stale} must be ignored`
      );
    });
  }
});

test("a KIRO_USER_AGENT newer than the pin is honored", async () => {
  const custom = "aws-sdk-js/1.0.0 m/E KiroIDE-9.0.0-operator";
  await withEnv({ KIRO_USER_AGENT: custom }, async () => {
    const [call] = await captureExecute({
      accessToken: "t",
      connectionId: "conn-custom",
      providerSpecificData: IDC_US_EAST,
    });
    assert.equal(header(call.headers, "User-Agent"), custom);
  });
});

test("a version-gate rejection logs how to recover", async () => {
  const warnings: string[] = [];
  await captureExecute(
    { accessToken: "t", connectionId: "conn-gate", providerSpecificData: IDC_US_EAST },
    () =>
      new Response(
        JSON.stringify({
          message:
            "This version of Kiro is no longer supported. Please update to the latest version of Kiro to continue.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
    { warn: (_tag, message) => warnings.push(message) }
  );
  assert.equal(warnings.length, 1, `expected one hint, got ${JSON.stringify(warnings)}`);
  assert.match(warnings[0], /KIRO_IDE_VERSION/);
  assert.match(warnings[0], new RegExp(`KiroIDE-${KIRO_IDE_VERSION_PIN.replaceAll(".", "\\.")}`));
});

test("other 400s do not log the version-gate hint", async () => {
  const warnings: string[] = [];
  await captureExecute(
    { accessToken: "t", connectionId: "conn-400", providerSpecificData: IDC_US_EAST },
    () =>
      new Response(JSON.stringify({ message: "Invalid model ID.", reason: "INVALID_MODEL_ID" }), {
        status: 400,
      }),
    { warn: (_tag, message) => warnings.push(message) }
  );
  assert.deepEqual(warnings, []);
});

test("a region-restricted model (INVALID_MODEL_ID) falls back without banning the connection", () => {
  // Claude requested from an unsupported egress region, live 2026-11-16. The same account
  // serves the model from another egress, so this must stay a no-cooldown fallback, never a ban.
  const body = {
    message: "Invalid model ID. Please select a different model to continue.",
    reason: "INVALID_MODEL_ID",
  };
  const type = classifyProviderError(400, body, "kiro");
  assert.notEqual(type, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.notEqual(type, PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
  const fallback = checkFallbackError(400, JSON.stringify(body), 0, "claude-haiku-4.5", "kiro");
  assert.equal(fallback.shouldFallback, true);
  assert.equal(fallback.cooldownMs, 0);
  assert.notEqual(fallback.permanent, true);
});

// ── catalog ────────────────────────────────────────────────────────────────

const PROFILE_ARN = "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST";

function catalogUpstream(handler: (url: URL) => { status?: number; body: unknown }) {
  const calls: Array<{ url: URL; headers: Headers }> = [];
  const fetchImpl = (async (url: URL | string, init?: RequestInit) => {
    const parsed = new URL(String(url));
    calls.push({ url: parsed, headers: { ...((init?.headers ?? {}) as Headers) } });
    const { status = 200, body } = handler(parsed);
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return { calls, fetchImpl };
}

test("catalog sends the profileArn first, with the unified version and the connection machineId", async () => {
  const { calls, fetchImpl } = catalogUpstream(() => ({
    body: { models: [{ modelId: "claude-sonnet-4.5" }] },
  }));
  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    connectionId: "conn-catalog",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  });
  assert.equal(result.source, "api");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url.searchParams.get("origin"), "AI_EDITOR");
  assert.equal(calls[0].url.searchParams.get("profileArn"), PROFILE_ARN);
  assert.equal(
    kiroTag(header(calls[0].headers, "User-Agent")),
    `KiroIDE-${KIRO_IDE_VERSION_PIN}-${kiroMachineId("conn-catalog")}`
  );
});

test("catalog follows nextToken and merges every page", async () => {
  const { calls, fetchImpl } = catalogUpstream((url) => {
    const page = Number(url.searchParams.get("nextToken") ?? "0");
    return {
      body: {
        models: [{ modelId: `model-${page}` }],
        ...(page < 2 ? { nextToken: String(page + 1) } : {}),
      },
    };
  });
  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    connectionId: "conn-pages",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  });
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["model-0", "model-1", "model-2"]
  );
  assert.equal(calls.length, 3);
  assert.equal(calls[2].url.searchParams.get("profileArn"), PROFILE_ARN);
});

test("catalog stops after 10 pages, like the Kiro IDE", async () => {
  let page = 0;
  const { calls, fetchImpl } = catalogUpstream(() => {
    page += 1;
    return { body: { models: [{ modelId: `model-${page}` }], nextToken: `next-${page}` } };
  });
  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    connectionId: "conn-cap",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  });
  assert.equal(calls.length, 10);
  assert.equal(result.models.length, 10);
});

test("a region-filtered catalog is kept as is, with no origin-only retry", async () => {
  // Unsupported egress region, live 2026-11-16: the profileArn call answers 200 with 9 models
  // and no Claude. Re-asking without the profileArn (or with an old IDE version) would list
  // models this egress cannot call, so the short list is the answer.
  const { calls, fetchImpl } = catalogUpstream(() => ({
    body: { models: [{ modelId: "deepseek-3.2" }, { modelId: "glm-5" }] },
  }));
  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    connectionId: "conn-geo",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  });
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["deepseek-3.2", "glm-5"]
  );
  assert.equal(calls.length, 1);
});

test("catalog retries without the profileArn only when the profileArn call fails", async () => {
  const { calls, fetchImpl } = catalogUpstream((url) =>
    url.searchParams.has("profileArn")
      ? { status: 403, body: { message: "forbidden" } }
      : { body: { models: [{ modelId: "claude-sonnet-4.5" }] } }
  );
  const result = await fetchKiroAvailableModels({
    accessToken: "tok",
    connectionId: "conn-stale-arn",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  });
  assert.equal(result.source, "api");
  assert.ok(calls[0].url.searchParams.has("profileArn"));
  assert.ok(!calls.at(-1)?.url.searchParams.has("profileArn"));
});

/**
 * Upstream for a connection that stored no profileArn. ListAvailableProfiles answers the
 * profile; ListAvailableModels answers the IdC 400 without a profileArn, as it did live on
 * 2026-11-16 with KiroIDE-1.4.178.
 */
function profileLessUpstream() {
  const calls: Array<{ url: URL; target: string | null }> = [];
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  const fetchImpl = (async (url: URL | string, init?: RequestInit) => {
    const parsed = new URL(String(url));
    const target = header((init?.headers ?? {}) as Headers, "x-amz-target") ?? null;
    calls.push({ url: parsed, target });
    if (target === "AmazonCodeWhispererService.ListAvailableProfiles") {
      return json(200, { profiles: [{ arn: PROFILE_ARN }] });
    }
    if (parsed.searchParams.get("profileArn") === PROFILE_ARN) {
      return json(200, { models: [{ modelId: "claude-sonnet-4.5" }] });
    }
    return json(400, { message: "Invalid profileArn.", missingPermissions: null, reason: null });
  }) as typeof fetch;
  return { calls, fetchImpl };
}

const isProfileLookup = (call: { target: string | null }) =>
  call.target === "AmazonCodeWhispererService.ListAvailableProfiles";

test("an IdC connection without a stored profileArn looks it up before listing models", async () => {
  // kiro-cli imports and some IdC logins store no profileArn. With a current Kiro IDE
  // version the origin-only call answers 400 "Invalid profileArn.", so without the lookup
  // these connections fell back to the static catalog.
  for (const authMethod of ["idc", "imported"]) {
    clearKiroModelCache();
    const { calls, fetchImpl } = profileLessUpstream();
    const result = await fetchKiroAvailableModels({
      accessToken: "tok",
      connectionId: `conn-no-arn-${authMethod}`,
      providerSpecificData: { authMethod, region: "us-east-1" },
      fetchImpl,
    });
    assert.equal(result.source, "api", `${authMethod}: ${JSON.stringify(result.failure)}`);
    assert.deepEqual(
      result.models.map((m) => m.id),
      ["claude-sonnet-4.5"]
    );
    assert.ok(calls.some(isProfileLookup), `${authMethod} must look the profile up`);
    const catalogCalls = calls.filter((call) => !isProfileLookup(call));
    assert.equal(catalogCalls[0]?.url.searchParams.get("profileArn"), PROFILE_ARN);
  }
});

test("Builder ID and API-key connections list models without a profile lookup", async () => {
  for (const authMethod of ["builder-id", "api_key"]) {
    clearKiroModelCache();
    const { calls, fetchImpl } = profileLessUpstream();
    await fetchKiroAvailableModels({
      accessToken: "tok",
      connectionId: `conn-profileless-${authMethod}`,
      providerSpecificData: { authMethod, region: "us-east-1" },
      fetchImpl,
    });
    assert.ok(!calls.some(isProfileLookup), `${authMethod} must not look a profile up`);
  }
});

test("Builder ID and GitHub/Google logins without a stored profileArn use the Kiro IDE's fixed one", async () => {
  // Kiro IDE 1.4.178 (getFixedProfileArn) lists models for these logins against a fixed
  // profileArn. Live 2026-11-16, Builder ID token: no profileArn -> 400 "Invalid profileArn."
  // (the dashboard sync answered 502); the BuilderId ARN -> 200, 8 models from US egress and
  // 5 without Claude from an unsupported region, so Kiro's region filter still applies.
  const BUILDER_ID_ARN = "arn:aws:codewhisperer:us-east-1:638616132270:profile/AAAACCCCXXXX";
  const SOCIAL_ARN = "arn:aws:codewhisperer:us-east-1:699475941385:profile/EHGA3GRVQMUK";
  const cases = [
    { psd: { authMethod: "builder-id", region: "us-east-1" }, arn: BUILDER_ID_ARN },
    { psd: { authMethod: "imported", provider: "Github" }, arn: SOCIAL_ARN },
    { psd: { authMethod: "imported", provider: "Google" }, arn: SOCIAL_ARN },
  ];
  for (const { psd, arn } of cases) {
    clearKiroModelCache();
    const { calls, fetchImpl } = catalogUpstream((url) =>
      url.searchParams.get("profileArn") === arn
        ? { body: { models: [{ modelId: "deepseek-3.2" }] } }
        : { status: 400, body: { message: "Invalid profileArn." } }
    );
    const label = JSON.stringify(psd);
    const result = await fetchKiroAvailableModels({
      accessToken: "tok",
      connectionId: `conn-fixed-arn-${label}`,
      providerSpecificData: psd,
      fetchImpl,
    });
    assert.equal(result.source, "api", `${label}: ${JSON.stringify(result.failure)}`);
    // One catalog call with the fixed ARN: no profile lookup, no origin-only retry.
    assert.equal(calls.length, 1, `${label}: ${calls.map((c) => c.url.href).join(" ")}`);
    assert.equal(calls[0].url.searchParams.get("profileArn"), arn, label);
  }
});

test("the catalog cache is per egress: a proxy change does not serve the other egress's list", async () => {
  // Kiro filters the catalog by egress region. On the test instance a connection switched
  // its proxy back on and kept getting the 9-model list fetched without the proxy, served
  // from the 5-minute cache keyed on the connection alone.
  let egress = "us";
  const { calls, fetchImpl } = catalogUpstream(() => ({
    body: {
      models:
        egress === "us"
          ? [{ modelId: "deepseek-3.2" }, { modelId: "glm-5" }]
          : [{ modelId: "deepseek-3.2" }],
    },
  }));
  const base = {
    accessToken: "tok",
    connectionId: "conn-egress",
    providerSpecificData: { ...IDC_US_EAST, profileArn: PROFILE_ARN },
    fetchImpl,
  };
  const viaProxy = await fetchKiroAvailableModels({ ...base, egressKey: "http://127.0.0.1:7890" });
  egress = "cn";
  const direct = await fetchKiroAvailableModels({ ...base, egressKey: "direct" });
  assert.deepEqual(
    viaProxy.models.map((m) => m.id),
    ["deepseek-3.2", "glm-5"]
  );
  assert.deepEqual(
    direct.models.map((m) => m.id),
    ["deepseek-3.2"]
  );
  assert.equal(calls.length, 2, "each egress must fetch its own catalog");

  // The same egress is still served from the cache.
  await fetchKiroAvailableModels({ ...base, egressKey: "direct" });
  assert.equal(calls.length, 2);
});

// ── inference profileArn ───────────────────────────────────────────────────

test("inference sends the Kiro IDE's fixed profileArn for logins that store none", async () => {
  // Live 2026-11-16, Builder ID token, US egress, invalid model id: every host
  // (runtime.us-east-1.kiro.dev, codewhisperer.us-east-1, q.us-east-1) with KiroIDE-1.4.121 or
  // 1.4.178 answers 400 "profileArn is required for this request." without a profileArn and
  // passes that check (400 INVALID_MODEL_ID) with the BuilderId fixed ARN. In the dashboard
  // every test message from the Builder ID connection failed with that 400.
  const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");
  const BUILDER_ID_ARN = "arn:aws:codewhisperer:us-east-1:638616132270:profile/AAAACCCCXXXX";
  const SOCIAL_ARN = "arn:aws:codewhisperer:us-east-1:699475941385:profile/EHGA3GRVQMUK";
  const body = { messages: [{ role: "user", content: "ping" }] };
  const cases: Array<{ psd: Record<string, unknown>; expected: string | undefined }> = [
    { psd: { authMethod: "builder-id", region: "us-east-1" }, expected: BUILDER_ID_ARN },
    { psd: { authMethod: "imported", provider: "Github" }, expected: SOCIAL_ARN },
    { psd: { authMethod: "imported", provider: "Google" }, expected: SOCIAL_ARN },
    // A stored profileArn always wins.
    {
      psd: { authMethod: "imported", provider: "Github", profileArn: PROFILE_ARN },
      expected: PROFILE_ARN,
    },
    { psd: { authMethod: "builder-id", profileArn: PROFILE_ARN }, expected: PROFILE_ARN },
    // Logins bound to their own profile get no fixed one.
    { psd: { authMethod: "idc", region: "us-east-1" }, expected: undefined },
    { psd: { authMethod: "api_key", region: "us-east-1" }, expected: undefined },
    { psd: { authMethod: "external_idp", region: "us-east-1" }, expected: undefined },
  ];
  for (const { psd, expected } of cases) {
    const payload = buildKiroPayload("deepseek-3.2", body, true, {
      providerSpecificData: psd,
    }) as { profileArn?: string };
    assert.equal(payload.profileArn, expected, JSON.stringify(psd));
  }
});

// ── usage / profile discovery ──────────────────────────────────────────────

test("usage requests carry the Kiro identity with the connection machineId", async () => {
  const originalFetch = globalThis.fetch;
  const seen: Headers[] = [];
  globalThis.fetch = (async (_url: URL | string, init?: RequestInit) => {
    seen.push({ ...((init?.headers ?? {}) as Headers) });
    return new Response(JSON.stringify({ message: "nope" }), { status: 500 });
  }) as typeof fetch;
  try {
    // Every attempt answers 500, so getKiroUsage rejects; only the headers matter here.
    await getKiroUsage("tok", { ...IDC_US_EAST, profileArn: PROFILE_ARN }, "conn-usage").catch(
      () => undefined
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(seen.length >= 3, `expected every usage attempt, got ${seen.length}`);
  for (const headers of seen) {
    assert.equal(
      kiroTag(header(headers, "User-Agent")),
      `KiroIDE-${KIRO_IDE_VERSION_PIN}-${kiroMachineId("conn-usage")}`
    );
  }
});

test("profile discovery carries the Kiro identity", async () => {
  const seen: Headers[] = [];
  const fetchImpl = (async (_url: URL | string, init?: RequestInit) => {
    seen.push({ ...((init?.headers ?? {}) as Headers) });
    return new Response(JSON.stringify({ profiles: [{ arn: PROFILE_ARN }] }), { status: 200 });
  }) as typeof fetch;
  await discoverKiroProfileArnAcrossRegions("tok", "us-east-1", fetchImpl);
  assert.ok(seen.length > 0);
  assert.equal(kiroTag(header(seen[0], "User-Agent")), `KiroIDE-${KIRO_IDE_VERSION_PIN}`);
});
