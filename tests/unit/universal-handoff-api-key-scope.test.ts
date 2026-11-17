/**
 * Universal handoff rows (context_handoffs, session_model_history) used to be
 * keyed only by (session_id, combo_name). The session id comes from a client
 * header (`x-session-id`) or a body fingerprint, neither of which says who the
 * caller is, so a second API key on the same instance and combo could read the
 * first key's handoff summary (injected as a system message) or plant one for
 * it. Rows are now stored per caller.
 *
 * Driven through handleChat with fetch mocked; no network.
 */
import { createHash } from "node:crypto";
import test from "node:test";
import assert from "node:assert/strict";

import { createComboRoutingHarness } from "../integration/_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("handoff-key-scope");
const {
  BaseExecutor,
  buildGeminiResponse,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedApiKey,
  seedConnection,
} = h;
const handoffDb = await import("../../src/lib/db/contextHandoffs.ts");
const { scopeHandoffSessionId: scope } =
  await import("../../open-sse/services/combo/handoffSessionScope.ts");
const { generateSessionId } = await import("../../open-sse/services/sessionManager.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getComboFailureCount, recordComboFailure } =
  await import("../../open-sse/services/combo/failureTracker.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { clearCooldownState } = await import("../../open-sse/services/providerCooldownTracker.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { _setEgressProbeForTests, clearEgressCache } = await import("../../src/lib/proxyEgress.ts");

let openaiConnectionId = "";

// The failed primary put openai into cooldown; lift it so the next turn can
// be served by openai again (that is the model switch under test).
async function liftCooldowns() {
  await providersDb.updateProviderConnection(openaiConnectionId, {
    rateLimitedUntil: null,
    testStatus: "active",
    lastError: null,
    errorCode: null,
    backoffLevel: 0,
  });
  clearAllModelLockouts();
  clearCooldownState();
  resetAllCircuitBreakers();
}

type Upstream = { provider: string; isSummary: boolean; text: string };
const upstream: Upstream[] = [];
let failOpenAI = false;

function installFetch() {
  upstream.length = 0;
  globalThis.fetch = (async (url: unknown, init: { body?: unknown } = {}) => {
    const provider = String(url).includes("generativelanguage") ? "gemini" : "openai";
    const text = typeof init.body === "string" ? init.body : JSON.stringify(init.body ?? {});
    const isSummary = text.includes("You are a context summarizer.");
    upstream.push({ provider, isSummary, text });
    if (failOpenAI && provider === "openai" && !isSummary) {
      return new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
    let content = "ok";
    if (isSummary) {
      // Echo every marker the summarizer saw, like a faithful summary would.
      const markers = [...new Set(text.match(/(SECRET|PLANTED)-[A-Z]+-\d+/g) || [])];
      content = JSON.stringify({
        summary: `Conversation mentions ${markers.join(", ") || "nothing"}.`,
        keyDecisions: markers,
        taskProgress: "in progress",
        activeEntities: markers,
      });
    }
    return provider === "gemini" ? buildGeminiResponse(content) : buildOpenAIResponse(content);
  }) as typeof fetch;
}

/** Wait for the exact caller-scoped session and combo, never an unrelated summary row. */
async function waitForHandoff(sessionId: string | null, comboName = "scope-pri") {
  assert.ok(sessionId, "precondition: the handoff has a scoped session id");
  for (let i = 0; i < 100 && !handoffDb.hasActiveHandoff(sessionId, comboName); i++) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.ok(
    handoffDb.hasActiveHandoff(sessionId, comboName),
    `precondition: a handoff was written for ${sessionId} in ${comboName}`
  );
}

type TurnOptions = {
  key?: string | null;
  sessionId?: string | null;
  combo?: string;
  messages: unknown[];
  failPrimary?: boolean;
};

// One client request; returns the non-summary upstream requests it caused.
async function turn({ key, sessionId, combo = "scope-pri", messages, failPrimary }: TurnOptions) {
  failOpenAI = failPrimary === true;
  const start = upstream.length;
  const response = await handleChat(
    buildRequest({
      authKey: key ?? null,
      headers: sessionId ? { "x-session-id": sessionId } : {},
      body: { model: combo, stream: false, messages },
    })
  );
  await response.text();
  failOpenAI = false;
  if (failPrimary) await liftCooldowns();
  assert.equal(response.status, 200);
  return upstream.slice(start).filter((call) => !call.isSummary);
}

// Priority combo [openai, gemini]: a failed primary makes gemini serve, so the
// next request that openai serves at the first target is a model switch. That
// second turn is where a handoff is injected (read) and generated (write).
async function switchTurns(options: Omit<TurnOptions, "failPrimary">) {
  await turn({ ...options, failPrimary: true });
  return turn(options);
}

const sees = (calls: Upstream[], marker: string) => calls.some((c) => c.text.includes(marker));

const SECRET_A = "SECRET-ALPHA-7781";
const PLANTED_B = "PLANTED-BRAVO-4242";
const msgsA = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hello" },
  { role: "user", content: `our deploy key is ${SECRET_A}` },
];
const benign = [{ role: "user", content: "hi" }];

async function setup(strategy = "priority", extra: Record<string, unknown> = {}) {
  const conn = (await seedConnection("openai", { apiKey: "sk-openai-scope" })) as { id: string };
  openaiConnectionId = conn.id;
  await seedConnection("gemini", { apiKey: "sk-gemini-scope" });
  for (const name of ["scope-pri", "scope-other"]) {
    await combosDb.createCombo({
      name,
      strategy,
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: [
        { id: "t1", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
        { id: "t2", kind: "model", providerId: "gemini", model: "gemini-2.5-flash" },
      ],
      ...extra,
    });
  }
  const a = (await seedApiKey({ name: "tenant-a" })) as { key: string; id: string };
  const b = (await seedApiKey({ name: "tenant-b" })) as { key: string; id: string };
  installFetch();
  return { a, b };
}

// A writes a handoff that carries its secret on session `sessionId`.
async function writeSecretAsA(
  a: { key: string; id: string },
  sessionId: string | null,
  combo = "scope-pri"
) {
  await switchTurns({ key: a.key, sessionId, combo, messages: msgsA });
  const rawSessionId = sessionId
    ? `ext:${sessionId}`
    : generateSessionId({ model: combo, messages: msgsA });
  await waitForHandoff(scope(rawSessionId, a.id), combo);
}

test.before(() => {
  // Handoff isolation needs no real network identity; the egress probe uses undici,
  // independently of the provider fetch stub installed below.
  clearEgressCache();
  _setEgressProbeForTests(async () => ({ ip: "192.0.2.1", latencyMs: 0, complete: true }));
});

test.afterEach(async () => {
  // Let fire-and-forget summary generation finish before storage is reset.
  await new Promise((resolve) => setTimeout(resolve, 150));
});

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  process.env.REQUIRE_API_KEY = "true";
  await resetStorage();
});

test.after(async () => {
  process.env.REQUIRE_API_KEY = "false";
  try {
    await h.cleanup();
  } finally {
    clearEgressCache();
    _setEgressProbeForTests(null);
  }
});

test("handoff wait ignores rows for other callers, sessions, and combos", async () => {
  const sessionId = scope("ext:pending-1", "key-a");
  assert.ok(sessionId);
  const writeRow = (id: string | null, comboName = "scope-pri") => {
    assert.ok(id);
    handoffDb.upsertHandoff({
      sessionId: id,
      comboName,
      fromAccount: "universal:gemini/gemini-2.5-flash",
      summary: "ready",
      keyDecisions: [],
      taskProgress: "",
      activeEntities: [],
      messageCount: 1,
      model: "gemini/gemini-2.5-flash",
      warningThresholdPct: 0,
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    });
  };

  // A background summary can finish before the summary this test needs.
  writeRow(scope("ext:pending-1", "key-b"));
  writeRow(scope("ext:pending-2", "key-a"));
  writeRow(sessionId, "scope-other");
  let finished = false;
  const waiting = waitForHandoff(sessionId).then(() => {
    finished = true;
  });
  try {
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(finished, false, "an unrelated summary satisfied the handoff wait");
  } finally {
    writeRow(sessionId);
    await waiting;
  }
  assert.equal(finished, true, "the requested handoff did not satisfy the wait");
});

test("key B on key A's session id and combo does not receive A's handoff", async () => {
  const { a, b } = await setup();
  await writeSecretAsA(a, "team-shared-1");
  const bCalls = await switchTurns({ key: b.key, sessionId: "team-shared-1", messages: benign });
  assert.ok(bCalls.length > 0);
  assert.equal(sees(bCalls, SECRET_A), false, "B's upstream request carries A's summary");
});

test("key B cannot plant a handoff that key A later receives", async () => {
  const { a, b } = await setup();
  await switchTurns({
    key: b.key,
    sessionId: "team-shared-2",
    messages: [...benign, { role: "user", content: `remember ${PLANTED_B}` }],
  });
  await waitForHandoff(scope("ext:team-shared-2", b.id));
  const aCalls = await switchTurns({ key: a.key, sessionId: "team-shared-2", messages: benign });
  assert.equal(sees(aCalls, PLANTED_B), false, "A's upstream request carries B's planted summary");
});

test("the same key still gets its own handoff back", async () => {
  const { a } = await setup();
  await writeSecretAsA(a, "own-1");
  const again = await switchTurns({ key: a.key, sessionId: "own-1", messages: benign });
  assert.equal(sees(again, SECRET_A), true, "A should see its own handoff summary");
  assert.match(again[0].text, /<context_handoff>/);
});

test("different session id or different combo: no cross-read, as before", async () => {
  const { a, b } = await setup();
  await writeSecretAsA(a, "sess-x");
  const otherSession = await switchTurns({ key: b.key, sessionId: "sess-y", messages: benign });
  const otherCombo = await switchTurns({
    key: a.key,
    sessionId: "sess-x",
    combo: "scope-other",
    messages: benign,
  });
  assert.equal(sees(otherSession, SECRET_A), false);
  assert.equal(sees(otherCombo, SECRET_A), false);
});

test("fingerprint session id (no header) does not cross keys", async () => {
  const { a, b } = await setup();
  // Same combo, same first user message: both requests get the same fingerprint.
  await writeSecretAsA(a, null);
  const bCalls = await switchTurns({ key: b.key, sessionId: null, messages: benign });
  assert.equal(sees(bCalls, SECRET_A), false, "B's fingerprint session reads A's summary");
});

test("requests without an API key share one bucket, separate from keyed callers", async () => {
  const { a } = await setup();
  await writeSecretAsA(a, "mixed-1");
  process.env.REQUIRE_API_KEY = "false";
  const anonCalls = await switchTurns({ key: null, sessionId: "mixed-1", messages: benign });
  assert.equal(sees(anonCalls, SECRET_A), false, "keyless request reads a keyed caller's summary");

  // Keyless callers still get their own session continuity.
  await switchTurns({ key: null, sessionId: "anon-1", messages: msgsA });
  await waitForHandoff(scope("ext:anon-1", null));
  const anonAgain = await switchTurns({ key: null, sessionId: "anon-1", messages: benign });
  assert.equal(sees(anonAgain, SECRET_A), true, "keyless session lost its own handoff");
});

for (const strategy of ["least-used", "strict-random", "random"]) {
  test(`${strategy}: key B does not receive key A's handoff`, async () => {
    const { a, b } = await setup(strategy);
    const sessionId = scope("ext:rot-1", a.id);
    assert.ok(sessionId);
    // These strategies switch models on their own; keep going until A has a row.
    for (let i = 0; i < 20 && !handoffDb.hasActiveHandoff(sessionId, "scope-pri"); i++) {
      await turn({ key: a.key, sessionId: "rot-1", messages: msgsA });
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    await waitForHandoff(sessionId);
    for (let i = 0; i < 12; i++) {
      const bCalls = await turn({ key: b.key, sessionId: "rot-1", messages: benign });
      assert.equal(sees(bCalls, SECRET_A), false, `B read A's summary on turn ${i + 1}`);
    }
  });
}

test("rows written before the upgrade (unscoped session id) are not served", async () => {
  const { a } = await setup();
  const legacyId = "ext:legacy-1";
  handoffDb.recordSessionModelUsage(legacyId, "scope-pri", "gemini/gemini-2.5-flash", "gemini");
  handoffDb.upsertHandoff({
    sessionId: legacyId,
    comboName: "scope-pri",
    fromAccount: "universal:gemini/gemini-2.5-flash",
    summary: `legacy ${SECRET_A}`,
    keyDecisions: [],
    taskProgress: "",
    activeEntities: [],
    messageCount: 1,
    model: "gemini/gemini-2.5-flash",
    lastModel: "gemini/gemini-2.5-flash",
    warningThresholdPct: 0,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
  const calls = await turn({ key: a.key, sessionId: "legacy-1", messages: benign });
  assert.equal(calls[0].provider, "openai");
  assert.equal(sees(calls, SECRET_A), false, "an unscoped legacy row was injected");

  process.env.REQUIRE_API_KEY = "false";
  const anonCalls = await turn({ key: null, sessionId: "legacy-1", messages: benign });
  assert.equal(sees(anonCalls, SECRET_A), false, "an unscoped legacy row was injected (no key)");
});

test("context_cache_protection pins do not cross keys", async () => {
  const { a, b } = await setup("priority", { context_cache_protection: true });
  // A's request is served by gemini (primary failed), which pins A's session.
  await turn({ key: a.key, sessionId: "pin-1", messages: benign, failPrimary: true });
  const bCalls = await turn({ key: b.key, sessionId: "pin-1", messages: benign });
  assert.equal(bCalls[0].provider, "openai", "B was routed by A's session pin");
  const aCalls = await turn({ key: a.key, sessionId: "pin-1", messages: benign });
  assert.equal(aCalls[0].provider, "gemini", "A lost its own session pin");
});

// Both early exits in targetResolution record a failure for the pinned session
// before any target is tried: no target can return the requested output size,
// or none meets the combo's strict context-window minimum.
for (const [label, extra, body] of [
  ["capability filter", {}, { max_tokens: 50_000_000 }],
  [
    "context requirements",
    {
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        contextRequirements: { minContextWindow: 1_000_000_000, contextFilterMode: "strict" },
      },
    },
    {},
  ],
] as const) {
  test(`context_cache_protection failure streaks are counted under the caller's session (${label})`, async () => {
    const { a } = await setup("priority", { context_cache_protection: true, ...extra });
    const sid = `streak-${label.replace(/ /g, "-")}`;
    const response = await handleChat(
      buildRequest({
        authKey: a.key,
        headers: { "x-session-id": sid },
        body: { model: "scope-pri", stream: false, messages: benign, ...body },
      })
    );
    await response.text();
    assert.ok(response.status >= 400, `precondition: the combo refused (${response.status})`);
    assert.equal(
      getComboFailureCount(`ext:${sid}`, "scope-pri"),
      0,
      "failure counted under the bare session id"
    );
    assert.equal(getComboFailureCount(scope(`ext:${sid}`, a.id), "scope-pri"), 1);
  });
}

test("context_cache_protection failure streaks are counted under the caller's session (weighted, all targets cooling down)", async () => {
  for (const [provider, model] of [
    ["openai", "a"],
    ["claude", "b"],
  ]) {
    recordModelLockoutFailure(provider, "", model, "unknown", 502, 60_000, null, {
      maxCooldownMs: 60_000,
    });
  }
  try {
    const log = { info() {}, warn() {}, error() {}, debug() {} };
    const response = await handleComboChat({
      body: {},
      combo: {
        name: "scope-weighted-cooling",
        strategy: "weighted",
        context_cache_protection: true,
        models: [
          { model: "openai/a", weight: 50 },
          { model: "claude/b", weight: 50 },
        ],
        config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      },
      handleSingleModel: async () => {
        throw new Error("nothing should be dispatched");
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: { sessionId: "ext:streak-cooling", apiKeyId: "key-cooling" },
      allCombos: null,
    });
    assert.equal(response.status, 503, "precondition: every target is cooling down");
    assert.equal(
      getComboFailureCount("ext:streak-cooling", "scope-weighted-cooling"),
      0,
      "failure counted under the bare session id"
    );
    assert.equal(
      getComboFailureCount(scope("ext:streak-cooling", "key-cooling"), "scope-weighted-cooling"),
      1
    );
  } finally {
    clearAllModelLockouts();
  }
});

test("context_cache_protection failure streaks are counted under the caller's session (all models failed)", async () => {
  await setup("priority", { context_cache_protection: true });
  const combo = await combosDb.getComboByName("scope-pri");
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const failEveryTarget = async (apiKeyId: string) => {
    const response = await handleComboChat({
      body: { model: "scope-pri", messages: benign },
      combo,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
          status: 500,
          headers: { "content-type": "application/json" },
        }),
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: { sessionId: "ext:streak-loop", apiKeyId },
      allCombos: null,
    });
    await response.text();
    assert.ok(response.status >= 500, `precondition: every target failed (${response.status})`);
    await liftCooldowns();
  };
  await failEveryTarget("key-loop-a");
  await failEveryTarget("key-loop-a");
  await failEveryTarget("key-loop-b");
  assert.equal(
    getComboFailureCount("ext:streak-loop", "scope-pri"),
    0,
    "failure counted under the bare session id"
  );
  assert.equal(getComboFailureCount(scope("ext:streak-loop", "key-loop-a"), "scope-pri"), 2);
  assert.equal(getComboFailureCount(scope("ext:streak-loop", "key-loop-b"), "scope-pri"), 1);
});

test("context_cache_protection failure streaks are counted under the caller's session (all accounts inactive)", async () => {
  await setup("priority", { context_cache_protection: true });
  const combo = await combosDb.getComboByName("scope-pri");
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  // A network error leaves no status, so the loop ends on ALL_ACCOUNTS_INACTIVE.
  const response = await handleComboChat({
    body: { model: "scope-pri", messages: benign },
    combo,
    handleSingleModel: async () => Response.error(),
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: { sessionId: "ext:streak-inactive", apiKeyId: "key-inactive-a" },
    allCombos: null,
  });
  const payload = (await response.json()) as { error?: { code?: string } };
  await liftCooldowns();
  assert.equal(payload.error?.code, "ALL_ACCOUNTS_INACTIVE", "precondition: no target answered");
  assert.equal(
    getComboFailureCount("ext:streak-inactive", "scope-pri"),
    0,
    "failure counted under the bare session id"
  );
  assert.equal(
    getComboFailureCount(scope("ext:streak-inactive", "key-inactive-a"), "scope-pri"),
    1
  );
  assert.equal(
    getComboFailureCount(scope("ext:streak-inactive", "key-inactive-b"), "scope-pri"),
    0
  );
});

test("a successful request clears the failure streak under the caller's session only", async () => {
  await setup("priority", { context_cache_protection: true });
  const combo = await combosDb.getComboByName("scope-pri");
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const sid = "ext:streak-clear";
  // Built here rather than with the helper, so the case also runs where it is absent.
  const owner = (key: string) => createHash("sha256").update(key).digest("hex").slice(0, 16);
  const scopedA = `k:${owner("key-clear-a")}:${sid}`;
  const scopedB = `k:${owner("key-clear-b")}:${sid}`;
  for (const id of [scopedA, scopedA, scopedB, scopedB]) recordComboFailure(id, "scope-pri");
  const succeed = async (apiKeyId: string) => {
    const response = await handleComboChat({
      body: { model: "scope-pri", messages: benign },
      combo,
      handleSingleModel: async () => buildOpenAIResponse("ok"),
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: { sessionId: sid, apiKeyId },
      allCombos: null,
    });
    await response.text();
    assert.equal(response.status, 200, "precondition: the request succeeded");
  };
  await succeed("key-clear-b");
  assert.equal(getComboFailureCount(scopedB, "scope-pri"), 0, "B's streak was not cleared");
  assert.equal(getComboFailureCount(scopedA, "scope-pri"), 2, "B's success cleared A's streak");
  await succeed("key-clear-a");
  assert.equal(getComboFailureCount(scopedA, "scope-pri"), 0, "A's streak was not cleared");
});

test("context-relay injection reads only the caller's own handoff", async () => {
  const { a, b } = await setup("context-relay");
  const row = (sessionId: string, summary: string) =>
    handoffDb.upsertHandoff({
      sessionId,
      comboName: "scope-pri",
      fromAccount: "some-other-connection",
      summary,
      keyDecisions: [],
      taskProgress: "",
      activeEntities: [],
      messageCount: 1,
      model: "openai/gpt-4o-mini",
      warningThresholdPct: 0.85,
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    });
  // A row stored under the bare session id (pre-fix layout) must not be
  // served to anyone who presents that session id.
  row("ext:relay-1", `bare ${SECRET_A}`);
  const bCalls = await turn({ key: b.key, sessionId: "relay-1", messages: benign });
  assert.equal(sees(bCalls, SECRET_A), false, "B received a handoff by session id alone");

  assert.equal(typeof scope, "function");
  row(scope("ext:relay-2", a.id)!, `own ${SECRET_A}`);
  const bOther = await turn({ key: b.key, sessionId: "relay-2", messages: benign });
  const aCalls = await turn({ key: a.key, sessionId: "relay-2", messages: benign });
  assert.equal(sees(bOther, SECRET_A), false, "B received A's context-relay handoff");
  assert.equal(sees(aCalls, `own ${SECRET_A}`), true, "A did not receive its own handoff");
});

test("scopeHandoffSessionId: stable per key, separate per key and for keyless calls", () => {
  assert.equal(typeof scope, "function");
  const s = scope!;
  assert.equal(s(null, "key-a"), null);
  assert.equal(s("", "key-a"), null);
  assert.equal(s("ext:x", "key-a"), s("ext:x", "key-a"));
  assert.notEqual(s("ext:x", "key-a"), s("ext:x", "key-b"));
  assert.notEqual(s("ext:x", "key-a"), s("ext:x", null));
  assert.equal(s("ext:x", null), s("ext:x", undefined));
  assert.notEqual(s("ext:x", null), "ext:x");
  assert.ok(!s("ext:x", "key-a")!.includes("key-a"), "raw API key id must not be stored");
  // The owner is the first 16 hex chars of sha256(key id); the session id is kept as sent.
  const keyHash = createHash("sha256").update("key-a").digest("hex").slice(0, 16);
  assert.equal(s("ext:Mixed.Case-1", "key-a"), `k:${keyHash}:ext:Mixed.Case-1`);
  assert.equal(s("ext:Mixed.Case-1", null), "anon:ext:Mixed.Case-1");
  const owners = new Set(
    Array.from({ length: 200 }, (_, i) => s("ext:x", `key-${i}`)!.split(":")[1])
  );
  assert.equal(owners.size, 200, "two API keys share a scope");
});
