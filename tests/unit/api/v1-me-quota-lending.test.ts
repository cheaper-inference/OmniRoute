// PATCH /api/v1/me/quota/{provider}: the key holder records lending consent for one pool, named
// by its opaque ref. Real handler and rows seeded through the src/lib/db modules.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-me-quota-lending-"));
const TEST_SECRET = "test-secret-at-least-32-chars-long-0123456789";
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = TEST_SECRET;

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const { upsertPlan } = await import("../../../src/lib/db/providerPlans.ts");
const { createPool, updatePool } = await import("../../../src/lib/db/quotaPools.ts");
const { getAllocationLending, setAllocationLending } =
  await import("../../../src/lib/db/quotaLending.ts");
const { recordConsumption, enforceQuotaShare } = await import("../../../src/lib/quota/enforce.ts");
const { buildPoolRef } = await import("../../../src/lib/quota/selfPoolRef.ts");
const { checkRateLimit, setRateLimiterTestMode } =
  await import("../../../src/shared/utils/rateLimiter.ts");
const { selfQuotaResponseSchema, checkLendingDeadline, LENDING_UNTIL_MIN_MS } =
  await import("../../../src/shared/schemas/selfQuota.ts");
const { handleSelfLendingPatch, SELF_LENDING_RATE_LIMIT } =
  await import("../../../src/server/selfService/lendingHandler.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");
const { isPublicApiRoute } = await import("../../../src/shared/constants/publicApiRoutes.ts");

type LendingDeps = NonNullable<Parameters<typeof handleSelfLendingPatch>[2]>;

const NOW = 1_800_000_000_000;
const UNTIL = 4102444800000;
const BODY_MESSAGE =
  "Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.";

async function connection(provider: string, name: string) {
  const conn = (await createProviderConnection({
    provider,
    authType: "oauth",
    name,
    accessToken: `test-token-${name}`,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  upsertPlan(conn.id, provider, [{ unit: "tokens", window: "daily", limit: 1000 }], "manual");
  return conn;
}

const connConsent = await connection("claude", "lending-consent-account");
const connSaturation = await connection("claude", "lending-saturation-account");
const connCodex = await connection("codex", "lending-codex-account");
const me = await apiKeysDb.createApiKey("lending-key-me", "test-machine", ["self:usage"]);
const other = await apiKeysDb.createApiKey("lending-key-other", "test-machine", ["self:usage"]);
const noScope = await apiKeysDb.createApiKey("lending-key-noscope", "test-machine", []);
const pair = [
  { apiKeyId: me.id, weight: 50, policy: "hard" as const },
  { apiKeyId: other.id, weight: 50, policy: "hard" as const },
];
const consentPool = createPool({
  connectionId: connConsent.id,
  name: "Consent Pool",
  borrowMode: "consent",
  allocations: pair,
});
const saturationPool = createPool({
  connectionId: connSaturation.id,
  name: "Saturation Pool",
  allocations: pair,
});
const codexPool = createPool({
  connectionId: connCodex.id,
  name: "Codex Pool",
  borrowMode: "consent",
  allocations: [{ apiKeyId: me.id, weight: 100, policy: "hard" }],
});
const INTERNAL_IDS = [
  consentPool.id,
  saturationPool.id,
  codexPool.id,
  connConsent.id,
  connSaturation.id,
  connCodex.id,
  me.id,
  other.id,
];

const refOf = (keyId: string, poolId: string) => buildPoolRef(keyId, poolId, TEST_SECRET);
const mine = refOf(me.id, consentPool.id);

function patch(key: string, provider: string, body: unknown, deps?: LendingDeps) {
  const url = `http://localhost/api/v1/me/quota/${encodeURIComponent(provider)}`;
  return handleSelfLendingPatch(
    new Request(url, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
    provider,
    deps
  );
}

async function messageOf(res: Response): Promise<string> {
  return ((await res.json()) as { error: { message: string } }).error.message;
}

test.beforeEach(() => {
  process.env.QUOTA_SELF_PANEL = "true";
  setRateLimiterTestMode(true);
  setAllocationLending(consentPool.id, me.id, { lendingPercent: 0, lendingUntil: null });
});

test.after(() => {
  setRateLimiterTestMode(false);
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a key in a consent pool records its consent and gets the updated view", async () => {
  const audit: unknown[] = [];
  const res = await patch(
    me.key,
    "claude",
    { pool: mine, lendingPercent: 30, lendingUntil: UNTIL },
    { audit: (e) => void audit.push(e) }
  );
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Cache-Control"), "no-store");
  const body = selfQuotaResponseSchema.parse(await res.json());
  const pool = body.pools.find((p) => p.ref === mine);
  assert.deepEqual(
    [pool?.lendingPercent, pool?.lendingUntil, pool?.lendingActive],
    [30, UNTIL, true]
  );
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 30,
    lendingUntil: UNTIL,
  });
  assert.equal(audit.length, 1);
  assert.partialDeepStrictEqual(audit[0], {
    action: "quota.pool.lending.updated",
    actor: `api-key:${me.id}`,
    target: consentPool.id,
    resourceType: "quota_pool",
    metadata: {
      apiKeyId: me.id,
      lendingPercent: 30,
      lendingUntil: UNTIL,
      previousLendingPercent: 0,
      previousLendingUntil: null,
    },
  });
  assert.equal(JSON.stringify(audit[0]).includes(me.key), false);
});

test("the same body twice writes once and audits once", async () => {
  const audit: unknown[] = [];
  const deps: LendingDeps = { audit: (e) => void audit.push(e) };
  const body = { pool: mine, lendingPercent: 45, lendingUntil: UNTIL };
  assert.equal((await patch(me.key, "claude", body, deps)).status, 200);
  assert.equal(audit.length, 1);
  assert.equal((await patch(me.key, "claude", body, deps)).status, 200);
  assert.equal(audit.length, 1);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 45,
    lendingUntil: UNTIL,
  });
});

test("zero clears the consent and its deadline, and needs no deadline check", async () => {
  setAllocationLending(consentPool.id, me.id, { lendingPercent: 20, lendingUntil: UNTIL });
  const res = await patch(me.key, "claude", { pool: mine, lendingPercent: 0, lendingUntil: 1 });
  assert.equal(res.status, 200);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
});

test("an omitted deadline means no deadline", async () => {
  setAllocationLending(consentPool.id, me.id, { lendingPercent: 20, lendingUntil: UNTIL });
  const res = await patch(me.key, "claude", { pool: mine, lendingPercent: 40 });
  assert.equal(res.status, 200);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 40,
    lendingUntil: null,
  });
});

test("the gate answers first: flag off 404, no key 401, no scope 403, bad provider 400", async () => {
  const body = { pool: mine, lendingPercent: 10 };
  delete process.env.QUOTA_SELF_PANEL;
  const off = await patch(me.key, "claude", body);
  assert.deepEqual([off.status, await messageOf(off)], [404, "Not found"]);
  process.env.QUOTA_SELF_PANEL = "true";
  const noKey = await patch("", "claude", body);
  assert.deepEqual([noKey.status, await messageOf(noKey)], [401, "Valid API key required"]);
  const scope = await patch(noScope.key, "claude", body);
  assert.deepEqual(
    [scope.status, await messageOf(scope)],
    [403, "API key lacks the self:usage scope"]
  );
  const provider = await patch(me.key, "Not a provider!", body);
  assert.deepEqual([provider.status, await messageOf(provider)], [400, "Invalid provider"]);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
});

test("malformed bodies are one fixed 400 and write nothing", async () => {
  const pool = mine;
  const before = getAllocationLending(consentPool.id, me.id);
  for (const body of [
    "{not json",
    {},
    { pool },
    { pool, lendingPercent: 12.5 },
    { pool, lendingPercent: "50" },
    { pool, lendingPercent: 101 },
    { pool, lendingPercent: -1 },
    { pool: "qpr_xyz", lendingPercent: 10 },
    { pool, lendingPercent: 10, lending: true },
    { pool, lendingPercent: 10, lendingUntil: "tomorrow" },
    { pool, lendingPercent: 10, lendingUntil: UNTIL + 0.5 },
  ]) {
    const res = await patch(me.key, "claude", body);
    assert.equal(res.status, 400);
    assert.equal(await messageOf(res), BODY_MESSAGE);
  }
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), before);
});

test("a deadline in seconds or not in the future is refused", async () => {
  const send = (lendingUntil: number) =>
    patch(me.key, "claude", { pool: mine, lendingPercent: 10, lendingUntil }, { now: () => NOW });
  const seconds = await send(Math.floor(UNTIL / 1000));
  assert.deepEqual(
    [seconds.status, await messageOf(seconds)],
    [400, "lendingUntil must be a Unix time in milliseconds"]
  );
  const present = await send(NOW);
  assert.deepEqual(
    [present.status, await messageOf(present)],
    [400, "lendingUntil must be in the future"]
  );
  assert.equal((await send(NOW - 1)).status, 400);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
  assert.equal((await send(NOW + 1)).status, 200);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 10,
    lendingUntil: NOW + 1,
  });
});

test("a reference of another key, of another provider's pool, or unknown is 404", async () => {
  for (const [provider, ref] of [
    ["claude", refOf(other.id, consentPool.id)],
    ["claude", refOf(me.id, codexPool.id)],
    ["claude", "qpr_" + "0".repeat(32)],
  ]) {
    const res = await patch(me.key, provider, { pool: ref, lendingPercent: 10 });
    assert.equal(res.status, 404);
    assert.equal(await messageOf(res), "Pool not found");
  }
  assert.deepEqual(getAllocationLending(consentPool.id, other.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
  assert.deepEqual(getAllocationLending(codexPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
});

test("a pool in saturation mode is 403 and keeps its stored value", async () => {
  setAllocationLending(saturationPool.id, me.id, { lendingPercent: 25, lendingUntil: null });
  const res = await patch(me.key, "claude", {
    pool: refOf(me.id, saturationPool.id),
    lendingPercent: 10,
  });
  assert.equal(res.status, 403);
  assert.equal(await messageOf(res), "Lending is not enabled for this pool");
  assert.deepEqual(getAllocationLending(saturationPool.id, me.id), {
    lendingPercent: 25,
    lendingUntil: null,
  });
});

test("more than 20 changes a minute is 429 with Retry-After, and the key's inference limiter is untouched", async () => {
  const seen: string[] = [];
  const blocked = await patch(
    me.key,
    "claude",
    { pool: mine, lendingPercent: 10 },
    {
      rateLimit: async (bucket) => {
        seen.push(bucket);
        return { allowed: false, resetAt: NOW + 30_000 };
      },
      now: () => NOW,
    }
  );
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("Retry-After"), "30");
  assert.equal(blocked.headers.get("Cache-Control"), "no-store");
  assert.equal(await messageOf(blocked), "Too many lending changes. Retry later.");
  assert.deepEqual(seen, [`self-lending:${me.id}`]);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
  const noReset = await patch(
    me.key,
    "claude",
    { pool: mine, lendingPercent: 10 },
    { rateLimit: async () => ({ allowed: false }), now: () => NOW }
  );
  assert.equal(noReset.headers.get("Retry-After"), "60");

  const runLoop = async () => {
    for (let i = 0; i < 20; i++) {
      const res = await patch(me.key, "claude", { pool: mine, lendingPercent: (i % 2) + 1 });
      assert.equal(res.status, 200);
    }
    return patch(me.key, "claude", { pool: mine, lendingPercent: 3 });
  };
  let last = await runLoop();
  if (last.status !== 429) {
    // The fixed window rolled over during the loop: start from an empty limiter once more.
    setRateLimiterTestMode(true);
    last = await runLoop();
  }
  assert.equal(last.status, 429);
  assert.equal(await messageOf(last), "Too many lending changes. Retry later.");
  assert.equal((await checkRateLimit(me.id, [{ limit: 1, window: 60 }])).allowed, true);
  assert.deepEqual(SELF_LENDING_RATE_LIMIT, { limit: 20, window: 60 });
});

test("no refusal carries an internal id or an error detail", async () => {
  const body = { pool: mine, lendingPercent: 10 };
  const refusals: Response[] = [];
  delete process.env.QUOTA_SELF_PANEL;
  refusals.push(await patch(me.key, "claude", body));
  process.env.QUOTA_SELF_PANEL = "true";
  refusals.push(
    await patch("", "claude", body),
    await patch(noScope.key, "claude", body),
    await patch(me.key, "Not a provider!", body),
    await patch(me.key, "claude", body, { rateLimit: async () => ({ allowed: false }) }),
    await patch(me.key, "claude", "{not json"),
    await patch(me.key, "claude", { ...body, lendingUntil: 5 }),
    await patch(me.key, "claude", { ...body, lendingUntil: NOW }, { now: () => NOW }),
    await patch(me.key, "claude", { ...body, pool: refOf(other.id, consentPool.id) }),
    await patch(me.key, "claude", { ...body, pool: refOf(me.id, saturationPool.id) }),
    await patch(me.key, "claude", body, {
      buildView: async () => {
        throw new Error(`view failed for ${consentPool.id} on ${connConsent.id}`);
      },
    })
  );
  assert.deepEqual(
    refusals.map((r) => r.status),
    [404, 401, 403, 400, 429, 400, 400, 400, 404, 403, 500]
  );
  for (const res of refusals) {
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    const text = await res.text();
    for (const leak of [...INTERNAL_IDS, "    at "]) assert.equal(text.includes(leak), false);
  }
});

test("the gate honours the consent the route stored", async () => {
  const gateInput = {
    apiKeyId: me.id,
    connectionId: connConsent.id,
    provider: "claude",
    model: "claude-x",
  };
  await recordConsumption({ ...gateInput, cost: { tokens: 500, requests: 1 } });
  assert.equal((await enforceQuotaShare(gateInput)).kind, "block");
  const res = await patch(other.key, "claude", {
    pool: refOf(other.id, consentPool.id),
    lendingPercent: 100,
  });
  assert.equal(res.status, 200);
  assert.equal((await enforceQuotaShare(gateInput)).kind, "allow");
});

test("the route file is a thin shell, and PATCH is classified like GET", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/v1/me/quota/[provider]/route.ts"),
    "utf8"
  );
  assert.ok(source.includes("handleSelfLendingPatch(request, provider)"));
  assert.match(source, /export async function PATCH\(/);
  assert.equal(classifyRoute("/api/v1/me/quota/claude").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1/me/quota/claude", "PATCH").routeClass, "CLIENT_API");
  assert.equal(
    isPublicApiRoute("/api/v1/me/quota/claude", "PATCH"),
    isPublicApiRoute("/api/v1/me/quota/claude", "GET")
  );
});

test("the deadline check", () => {
  assert.deepEqual(
    [null, undefined, NOW + 1, NOW, LENDING_UNTIL_MIN_MS - 1].map((u) =>
      checkLendingDeadline(u, NOW)
    ),
    ["ok", "ok", "ok", "past", "seconds"]
  );
});

test("a deadline past the largest Date is the fixed 400 and writes nothing", async () => {
  const before = getAllocationLending(consentPool.id, me.id);
  const tooLate = await patch(me.key, "claude", {
    pool: mine,
    lendingPercent: 10,
    lendingUntil: 8_640_000_000_000_001,
  });
  assert.equal(tooLate.status, 400);
  assert.equal(await messageOf(tooLate), BODY_MESSAGE);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), before);

  const latest = await patch(me.key, "claude", {
    pool: mine,
    lendingPercent: 10,
    lendingUntil: 8_640_000_000_000_000,
  });
  assert.equal(latest.status, 200, await latest.clone().text());
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), {
    lendingPercent: 10,
    lendingUntil: 8_640_000_000_000_000,
  });
});

test("a streamed body over 4096 bytes without Content-Length is refused before it is drained", async () => {
  const before = getAllocationLending(consentPool.id, me.id);
  const totalChunks = 64;
  let pulled = 0;
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulled >= totalChunks) {
        controller.close();
        return;
      }
      pulled += 1;
      controller.enqueue(new Uint8Array(1024).fill(0x20));
    },
    cancel() {
      cancelled = true;
    },
  });
  const request = new Request("http://localhost/api/v1/me/quota/claude", {
    method: "PATCH",
    headers: { Authorization: "Bearer " + me.key, "Content-Type": "application/json" },
    body: stream,
    duplex: "half",
  } as RequestInit);
  assert.equal(request.headers.get("content-length"), null);

  const res = await handleSelfLendingPatch(request, "claude");
  assert.equal(res.status, 400);
  assert.equal(await messageOf(res), BODY_MESSAGE);
  assert.equal(cancelled, true);
  assert.ok(pulled < totalChunks, `pulled ${pulled} of ${totalChunks} chunks`);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), before);
});

test("a body over 4096 bytes is the fixed 400 and writes nothing", async () => {
  const before = getAllocationLending(consentPool.id, me.id);
  const valid = JSON.stringify({ pool: mine, lendingPercent: 10 });
  const long = await patch(me.key, "claude", valid + " ".repeat(5000 - valid.length));
  assert.equal(long.status, 400);
  assert.equal(await messageOf(long), BODY_MESSAGE);

  const declared = await handleSelfLendingPatch(
    new Request("http://localhost/api/v1/me/quota/claude", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + me.key,
        "Content-Type": "application/json",
        "Content-Length": "4097",
      },
      body: valid,
    }),
    "claude"
  );
  assert.equal(declared.status, 400);
  assert.equal(await messageOf(declared), BODY_MESSAGE);
  assert.deepEqual(getAllocationLending(consentPool.id, me.id), before);

  const padded = await patch(me.key, "claude", valid + " ".repeat(4096 - valid.length));
  assert.equal(padded.status, 200, await padded.clone().text());
});

test("a key holder can withdraw a stored consent after the pool is switched to saturation", async () => {
  const ref = refOf(me.id, saturationPool.id);
  updatePool(saturationPool.id, { borrowMode: "consent" });
  setAllocationLending(saturationPool.id, me.id, { lendingPercent: 25, lendingUntil: UNTIL });
  updatePool(saturationPool.id, { borrowMode: "saturation" });
  const audit: unknown[] = [];
  const deps: LendingDeps = { audit: (e) => void audit.push(e) };

  const raised = await patch(me.key, "claude", { pool: ref, lendingPercent: 25 }, deps);
  assert.equal(raised.status, 403);
  assert.equal(await messageOf(raised), "Lending is not enabled for this pool");
  assert.deepEqual(getAllocationLending(saturationPool.id, me.id), {
    lendingPercent: 25,
    lendingUntil: UNTIL,
  });
  assert.equal(audit.length, 0);

  const withdrawn = await patch(
    me.key,
    "claude",
    { pool: ref, lendingPercent: 0, lendingUntil: UNTIL },
    deps
  );
  assert.equal(withdrawn.status, 200, await withdrawn.clone().text());
  const view = selfQuotaResponseSchema.parse(await withdrawn.json());
  const pool = view.pools.find((p) => p.ref === ref);
  assert.deepEqual(
    [pool?.borrowMode, pool?.lendingPercent, pool?.lendingUntil, pool?.lendingActive],
    ["saturation", 0, null, false]
  );
  // A deadline sent with zero is stored as no deadline, as in a consent pool.
  assert.deepEqual(getAllocationLending(saturationPool.id, me.id), {
    lendingPercent: 0,
    lendingUntil: null,
  });
  assert.equal(audit.length, 1);
  assert.partialDeepStrictEqual(audit[0], {
    action: "quota.pool.lending.updated",
    target: saturationPool.id,
    metadata: { lendingPercent: 0, lendingUntil: null, previousLendingPercent: 25 },
  });

  const again = await patch(me.key, "claude", { pool: ref, lendingPercent: 0 }, deps);
  assert.equal(again.status, 200);
  assert.equal(audit.length, 1, "the same withdrawal is audited once");
});
