import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const oldDir = process.env.DATA_DIR;
const dir = mkdtempSync(join(tmpdir(), "omniroute-kimi-queue-"));
process.env.DATA_DIR = dir;
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { acquire, buildAccountSemaphoreKey, getStats, markBlocked, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { resolvePersistedRetryCooldown } =
  await import("../../open-sse/services/combo/persistedConnectionCooldown.ts");

test.after(() => resetAll());
process.once("exit", () => {
  resetDbInstance();
  if (oldDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = oldDir;
  rmSync(dir, { recursive: true, force: true });
});

const provider = "kimi-coding";
const model = "kimi-coding/kimi-for-coding";
const log = { info() {}, warn() {}, error() {}, debug() {} };
function ok() {
  return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
}
function seed(id: string) {
  getDbInstance()
    .prepare(
      "INSERT INTO provider_connections (id, provider, auth_type, is_active, max_concurrent, created_at, updated_at) VALUES (?, ?, 'oauth', 1, 1, datetime('now'), datetime('now'))"
    )
    .run(id, provider);
}
function occupy(id: string) {
  return acquire(buildAccountSemaphoreKey({ provider, accountKey: id }), { maxConcurrency: 1 });
}
function route(
  ids: string[],
  attempt: (id: string, allowRateLimited?: boolean) => Promise<Response>,
  protectedFirst = false,
  strategy: "priority" | "round-robin" = "priority",
  signal?: AbortSignal
) {
  return handleComboChat({
    body: { messages: [] },
    signal,
    log,
    allCombos: null,
    combo: {
      name: "fixture-" + ids[0],
      strategy,
      models: ids.map((id, index) => ({
        id,
        fallbackOnlyOnQuotaExhaustion: protectedFirst && index === 0,
        kind: "model",
        providerId: provider,
        model: model,
        connectionId: id,
      })),
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body, _model, target) =>
      attempt(target!.connectionId!, target!.allowRateLimitedConnection),
    isModelAvailable: async () => true,
  });
}

test("a provider-identified Kimi concurrency 403 preserves the retry hint", () => {
  const result = checkFallbackError(
    403,
    "Too many concurrent requests",
    0,
    model,
    provider,
    { "retry-after": "2" },
    null,
    { type: "rate_limit_error", code: "concurrency_limit_exceeded" }
  );
  assert.deepEqual(
    { reason: result.reason, cooldownMs: result.cooldownMs, terminal: !!result.permanent },
    { reason: "concurrency_limited", cooldownMs: 2000, terminal: false }
  );
});

test("Kimi contention expires at its own deadline without reopening a quota hold", async () => {
  const target = { modelStr: model, connectionId: "elapsed-contention" };
  const row = {
    provider,
    isActive: true,
    testStatus: "rate_limited",
    lastErrorType: "concurrency_limited",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() - 1_000).toISOString(),
  };
  const read = (overrides: Partial<typeof row>) =>
    resolvePersistedRetryCooldown(target, async () => ({ ...row, ...overrides }), true);
  assert.equal((await read({})).skipReason, null);
  assert.ok((await read({ lastErrorType: "quota_exhausted" })).skipReason);
  assert.ok((await read({ errorCode: 403 })).skipReason);
  assert.ok((await read({ provider: "other-provider" })).skipReason);
});

async function waitUntil(check: () => boolean) {
  const deadline = Date.now() + 2200;
  while (!check() && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 5));
  assert.ok(check(), "expected queue state was never reached");
}

test("the same incoming Kimi request waits for the first available permitted account", async () => {
  const ids = ["local-busy-a", "local-busy-b"];
  ids.forEach(seed);
  const releases = await Promise.all(ids.map(occupy));
  const calls: string[] = [];
  const pending = route(ids, async (id) => {
    calls.push(id);
    return ok();
  });
  try {
    await waitUntil(() => ids.every((id) => getStats()[provider + ":" + id]?.queued === 1));
    assert.deepEqual(calls, []);
    releases[1]();
    assert.equal((await pending).status, 200);
    assert.deepEqual(calls, [ids[1]]);
  } finally {
    releases.forEach((release) => release());
    await pending;
  }
});

test("a disconnected Kimi waiter never sends, even after the account becomes available", async () => {
  const id = "cancelled-kimi-waiter";
  seed(id);
  const release = await occupy(id);
  const abort = new AbortController();
  const calls: string[] = [];
  const pending = route(
    [id],
    async (name) => {
      calls.push(name);
      return ok();
    },
    false,
    "priority",
    abort.signal
  );
  try {
    await waitUntil(() => getStats()[provider + ":" + id]?.queued === 1);
    abort.abort();
    assert.equal((await pending).status, 499);
    assert.equal(getStats()[provider + ":" + id]?.queued, 0);
  } finally {
    abort.abort();
    release();
    await pending;
  }
  assert.deepEqual(calls, []);
});

test("the account concurrency setting caps a larger Kimi rate-limit override", async () => {
  const { resolveAccountSemaphoreMaxConcurrency: resolve } =
    await import("../../open-sse/handlers/chatCore/executorHelpers.ts");
  assert.equal(resolve({ maxConcurrent: 1, rateLimitMaxConcurrent: 4 }, true, provider), 1);
  assert.equal(resolve({ maxConcurrent: 3, rateLimitMaxConcurrent: 1 }, true, provider), 1);
  assert.equal(resolve({ maxConcurrent: 3, rateLimitMaxConcurrent: 1 }, false, provider), 3);
});

test("separately loaded route modules share account reservations and drain each other's queue", async () => {
  const path = new URL("../../open-sse/services/accountSemaphore.ts", import.meta.url);
  const copy: typeof import("../../open-sse/services/accountSemaphore.ts") = await import(
    path.href + "?second-route-bundle"
  );
  const key = provider + ":cross-bundle";
  const release = await acquire(key, { maxConcurrency: 1 });
  let admitted = false;
  try {
    assert.equal(copy.getAccountSemaphoreFullReason(provider, "cross-bundle", 1), "occupied");
    const next = copy.acquire(key, { maxConcurrency: 1 }).then((done) => {
      admitted = true;
      return done;
    });
    await Promise.resolve();
    assert.equal(admitted, false);
    assert.equal(getStats()[key]?.queued, 1);
    release();
    (await next)();
  } finally {
    release();
  }
});

test("a quota-blocked semaphore is not treated as a one-second slot shortage", async () => {
  const id = "quota-blocked";
  seed(id);
  const key = buildAccountSemaphoreKey({ provider, accountKey: id });
  const release = await occupy(id);
  markBlocked(key, Date.now() + 120000);
  release();
  const response = await route([id], async () => assert.fail("blocked account dispatched"));
  assert.notEqual((await response.json()).error.code, "concurrency_limited");
  assert.notEqual(response.headers.get("retry-after"), "1");
});

test("a protected locally occupied Kimi target waits on that account without sending to its sibling", async () => {
  const ids = ["protected-busy", "protected-sibling"];
  ids.forEach(seed);
  const release = await occupy(ids[0]);
  try {
    const calls: string[] = [];
    const pending = route(
      ids,
      async (id) => {
        calls.push(id);
        return ok();
      },
      true
    );
    await waitUntil(() => getStats()[provider + ":" + ids[0]]?.queued === 1);
    assert.deepEqual(calls, []);
    release();
    assert.equal((await pending).status, 200);
    assert.deepEqual(calls, [ids[0]]);
  } finally {
    release();
  }
});

test("a Kimi account disabled while its request waits cannot be dispatched or reopened", async () => {
  const id = "disabled-during-queue";
  seed(id);
  const release = await occupy(id);
  const pending = route([id], async () => assert.fail("disabled Kimi account dispatched"));
  try {
    await waitUntil(() => getStats()[provider + ":" + id]?.queued === 1);
    getDbInstance().prepare("UPDATE provider_connections SET is_active=0 WHERE id=?").run(id);
    release();
    assert.ok((await pending).status >= 400);
    assert.deepEqual(
      getDbInstance().prepare("SELECT is_active FROM provider_connections WHERE id=?").get(id),
      { is_active: 0 }
    );
  } finally {
    release();
    await pending;
  }
});

test("a Kimi wire slot stays owned until asynchronous cancellation of the upstream body ends", async () => {
  const { withKimiAccountSlot } = await import("../../open-sse/executors/kimiAccountDispatch.ts");
  const input = {
    credentials: { connectionId: "wire-cancel", maxConcurrent: 1 },
    model,
    body: {},
    stream: true,
  };
  const closed = Promise.withResolvers<void>();
  const wire = new ReadableStream<Uint8Array>({ cancel: () => closed.promise });
  const first = await withKimiAccountSlot(input, async () => new Response(wire));
  assert.ok(first instanceof Response && first.body);
  const done = first.body.cancel();
  let started = false;
  const next = withKimiAccountSlot(input, async () => {
    started = true;
    return new Response(null, { status: 204 });
  });
  try {
    await waitUntil(() => getStats()["kimi-wire:wire-cancel"]?.queued === 1);
    assert.equal(started, false);
  } finally {
    closed.resolve();
  }
  await done;
  await next;
  assert.equal(started, true);
});

test("Kimi nested and strategy eligibility distinguishes occupied, cooldown and other providers", async () => {
  const { isUnqueueableAccount } = await import("../../open-sse/services/combo/kimiLocalQueue.ts");
  const id = "nested-cap";
  const free = await occupy(id);
  const foreign = await acquire("other:" + id, { maxConcurrency: 1 });
  try {
    assert.equal(isUnqueueableAccount(provider, id, 1), false);
    assert.equal(isUnqueueableAccount("other", id, 1), true);
    markBlocked(provider + ":" + id, Date.now() + 60_000);
    assert.equal(isUnqueueableAccount(provider, id, 1), true);
  } finally {
    free();
    foreign();
  }
});

test("two independent accounts can stream in parallel while a second stream on the same account waits", async () => {
  const { withKimiAccountSlot } = await import("../../open-sse/executors/kimiAccountDispatch.ts");
  function wire(account: string, send: () => Promise<Response>) {
    return withKimiAccountSlot(
      {
        model,
        stream: true,
        body: {},
        credentials: {
          connectionId: account,
          maxConcurrent: 1,
        },
      },
      send
    );
  }
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  const first = await wire(
    "fixture-wire-a",
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            upstream = controller;
          },
        })
      )
  );
  assert.ok(first instanceof Response);
  let secondSent = false;
  const second = wire("fixture-wire-a", async () => {
    secondSent = true;
    return new Response(null, { status: 204 });
  });
  try {
    await waitUntil(() => getStats()["kimi-wire:fixture-wire-a"]?.queued === 1);
    const independent = await wire("fixture-wire-b", async () => new Response("independent"));
    assert.ok(independent instanceof Response);
    assert.equal(await independent.text(), "independent");
    assert.equal(secondSent, false);
  } finally {
    upstream.close();
    await first.arrayBuffer();
  }
  await second;
  assert.equal(secondSent, true);
});

test("a Kimi send made ineligible during the wire queue never reaches the upstream callback", async () => {
  const { withKimiAccountSlot } = await import("../../open-sse/executors/kimiAccountDispatch.ts");
  const gate = "kimi-wire:fixture-wire-disabled";
  const release = await acquire(gate, { maxConcurrency: 1 });
  let enabled = true;
  const calls: string[] = [];
  const waiting = withKimiAccountSlot(
    {
      credentials: { connectionId: "fixture-wire-disabled", maxConcurrent: 1 },
      model,
      body: {},
      stream: false,
      kimiQueue: {
        deadline: Date.now() + 5000,
        maxQueueSize: 2,
        canDispatch: async () => enabled,
        onDispatch: () => calls.push("dispatch"),
      },
    },
    async () => {
      calls.push("send");
      return new Response(null, { status: 204 });
    }
  );
  try {
    await waitUntil(() => getStats()[gate]?.queued === 1);
    enabled = false;
  } finally {
    release();
  }
  await assert.rejects(waiting, { code: "KIMI_ACCOUNT_UNAVAILABLE" });
  assert.deepEqual(calls, []);
});

test("only explicit Kimi contention changes a 403 and the available retry hint is preserved", async () => {
  const { normalizeKimiConcurrency } = await import("../../open-sse/services/kimiConcurrency.ts");
  const exact =
    "You've reached your concurrent request limit. Please wait for your ongoing requests to finish and try again.";
  for (const err of [
    {
      message: "Too many concurrent requests",
      type: "rate_limit_error",
      code: "concurrency_limit_exceeded",
    },
    { message: exact },
  ]) {
    const raw = Response.json({ error: err }, { status: 403, headers: { "retry-after": "3" } });
    const converted = await normalizeKimiConcurrency(provider, raw);
    assert.equal(converted.status, 429);
    assert.equal(converted.headers.get("retry-after"), "3");
    assert.deepEqual(await converted.json(), { error: err });
  }
  for (const envelope of [
    { error: { message: "Access denied" } },
    { error: { message: exact, code: "insufficient_quota" } },
    { error: { message: exact, type: "authentication_error" } },
    {
      error: { message: exact, code: "concurrency_limit_exceeded", details: { reason: "revoked" } },
    },
    { error: { message: exact }, message: "Weekly quota exhausted" },
    { error: { message: "Too many concurrent requests" } },
    { error: { message: exact + " Weekly quota exhausted." } },
  ]) {
    const raw = Response.json(envelope, { status: 403 });
    assert.equal(await normalizeKimiConcurrency(provider, raw), raw);
    assert.deepEqual(await raw.json(), envelope);
  }
  const other = Response.json({ error: { message: exact } }, { status: 403 });
  assert.equal(await normalizeKimiConcurrency("another-provider", other), other);
});

test("Kimi OAuth and API-key routing names see the same occupied account in either direction", async () => {
  const aliases = ["kimi-coding", "kimi-coding-apikey"];
  const { getAccountSemaphoreFullReason } =
    await import("../../open-sse/services/accountSemaphore.ts");
  for (const first of aliases) {
    const id = "fixture-shared-row";
    const release = await acquire(buildAccountSemaphoreKey({ provider: first, accountKey: id }), {
      maxConcurrency: 1,
    });
    try {
      for (const alias of aliases)
        assert.equal(getAccountSemaphoreFullReason(alias, id, 1), "occupied");
      assert.equal(getAccountSemaphoreFullReason("other", id, 1), null);
    } finally {
      release();
    }
  }
});

test("a flattened busy code cannot override a contradictory full provider envelope", () => {
  const result = checkFallbackError(
    403,
    "Too many concurrent requests",
    0,
    model,
    provider,
    null,
    null,
    {
      code: "concurrency_limit_exceeded",
      type: "rate_limit_error",
      upstreamBody: {
        error: {
          code: "concurrency_limit_exceeded",
          type: "rate_limit_error",
          message: "Too many concurrent requests",
          details: { reason: "ACCOUNT_DISABLED" },
        },
      },
    }
  );
  assert.notEqual(result.reason, "concurrency_limited");
});

test("a provider request ID preserves contention while explicit Bearer challenges retain their denial", async () => {
  const { normalizeKimiConcurrency } = await import("../../open-sse/services/kimiConcurrency.ts");
  const err = {
    code: "concurrency_limit_exceeded",
    type: "rate_limit_error",
    message: "Too many concurrent requests",
  };
  const envelope = { type: "error", request_id: "req-fixture", error: err };
  for (const alias of ["kimi-coding", "kimi-coding-apikey"]) {
    const normalized = await normalizeKimiConcurrency(
      alias,
      Response.json(envelope, { status: 403, headers: { "retry-after": "9" } })
    );
    assert.equal(normalized.status, 429);
    const result = checkFallbackError(
      normalized.status,
      JSON.stringify(await normalized.json()),
      0,
      model,
      alias,
      normalized.headers
    );
    assert.equal(result.reason, "concurrency_limited");
    assert.equal(result.cooldownMs, 9000);
    for (const code of ["invalid_token", "insufficient_scope"]) {
      const headers = new Headers({ "www-authenticate": 'Bearer error="' + code + '"' });
      const response = Response.json(envelope, { status: 403, headers });
      assert.equal(await normalizeKimiConcurrency(alias, response), response);
      assert.notEqual(
        checkFallbackError(403, err.message, 0, model, alias, headers, null, err).reason,
        "concurrency_limited"
      );
    }
  }
});

for (const stream of [false, true]) {
  test(`Kimi ${stream ? "stream" : "JSON"} request on the sibling alias leaves the protected limiter and the selected account available`, async () => {
    const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
    const { enableRateLimitProtection, disableRateLimitProtection, __getLimiterStateForTests } =
      await import("../../open-sse/services/rateLimitManager.ts");
    const id = stream ? "fixture-integrated-oauth" : "fixture-integrated-api";
    const routingName = stream ? "kimi-coding-apikey" : "kimi-coding";
    const storedProvider = stream ? "kimi-coding" : "kimi-coding-apikey";
    seed(id);
    getDbInstance()
      .prepare("UPDATE provider_connections SET provider=? WHERE id=?")
      .run(storedProvider, id);
    enableRateLimitProtection(id);
    const seen: string[] = [];
    const saved = globalThis.fetch;
    globalThis.fetch = async () => {
      seen.push("upstream");
      return Response.json(
        {
          error: {
            type: "rate_limit_error",
            code: "concurrency_limit_exceeded",
            message: "Too many concurrent requests",
          },
        },
        { status: 403, headers: { "retry-after": "9" } }
      );
    };
    const wireModel = "k3.1-pro";
    const body = {
      model: wireModel,
      stream,
      max_tokens: 8,
      messages: [{ role: "user", content: "hello" }],
    };
    try {
      const result = await handleChatCore({
        body,
        modelInfo: {
          provider: routingName,
          model: wireModel,
          extendedContext: false,
          targetFormat: "openai",
        },
        connectionId: id,
        credentials: {
          connectionId: id,
          maxConcurrent: 1,
          apiKey: "fixture",
          providerSpecificData: { _omnirouteKimiTargetFormat: "openai" },
        },
        log,
        clientRawRequest: {
          endpoint: "/v1/chat/completions",
          body,
          headers: new Headers({ "content-type": "application/json" }),
        },
      } as Parameters<typeof handleChatCore>[0]);
      assert.equal(result.status, 429);
      await result.response.text();
      assert.deepEqual(seen, ["upstream"]);
      assert.ok(
        await __getLimiterStateForTests(routingName, id, wireModel),
        "the logical 429 evicted the physical limiter"
      );
      assert.equal(
        getDbInstance().prepare("SELECT is_active FROM provider_connections WHERE id=?").get(id)
          ?.is_active,
        1
      );
    } finally {
      globalThis.fetch = saved;
      disableRateLimitProtection(id);
    }
  });
}
