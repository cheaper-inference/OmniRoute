import type { ComboLike } from "../../open-sse/services/combo/types.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const h = await createComboRoutingHarness("capacity-admission");
const sem = await import("../../open-sse/services/accountSemaphore.ts");
const aux = await import("../../open-sse/services/rateLimitSemaphore.ts");
const providers = await import("../../src/lib/db/providers.ts");
const log = { info() {}, warn() {}, debug() {}, error() {} };
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const config = {
  maxRetries: 0,
  maxSetRetries: 0,
  retryDelayMs: 0,
  queueTimeoutMs: 500,
  comboTimeoutMs: 3000,
};
let sequence = 0;
test.before(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  const id = await account();
  await combo("capacity-fixture-warmup", "round-robin", [model(id)]);
  h.installRecordingFetch();
  const response = await request("capacity-fixture-warmup", "warm synthetic executor");
  assert.equal(response.status, 200);
  await response.text();
});
test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
});
test.afterEach(async () => {
  sem.resetAll();
  aux.resetAll();
  await h.resetStorage();
});
test.after(h.cleanup);

async function account() {
  return String(
    (
      await providers.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        apiKey: "synthetic-only-" + sequence,
        name: "capacity-" + ++sequence,
        isActive: true,
        maxConcurrent: 1,
      })
    ).id
  );
}
function model(connectionId: string, model = "gpt-4o-mini", extra = {}) {
  return { kind: "model", provider: "openai", providerId: "openai", model, connectionId, ...extra };
}
async function combo(name: string, strategy: string, models: unknown[], extra = {}) {
  return h.combosDb.createCombo({ name, strategy, models, config: { ...config, ...extra } });
}
function request(name: string, content = name) {
  return h.handleChat(
    h.buildRequest({
      body: { model: name, stream: false, messages: [{ role: "user", content }] },
    })
  );
}

test("real executor: older standalone RR joins account FIFO before younger common turn", async () => {
  const id = await account();
  await combo("older-rr", "round-robin", [model(id, "gpt-4o")]);
  await combo("younger-common", "priority", [model(id)]);
  h.installRecordingFetch();
  const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
  const first = request("older-rr");
  let second: Promise<Response> | undefined;
  try {
    assert.ok(
      await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 1, 2000),
      "older RR must join the account queue first"
    );
    assert.deepEqual(aux.getStats(), {}, "RR holds no auxiliary while composite queues");
    second = request("younger-common");
    assert.ok(
      await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 2, 2000),
      "younger common must join after the older RR"
    );
    held();
    assert.equal((await first).status, 200);
    assert.equal((await second).status, 200);
    assert.deepEqual(
      h.calls.map((call) => call.model),
      ["gpt-4o", "gpt-4o-mini"]
    );
  } finally {
    held();
    await first;
    await second;
  }
});

test("real executor: RR auxiliary queue rejection skips to another target without upstream penalty", async () => {
  const id = await account();
  const other = await account();
  await combo(
    "rr-overflow",
    "round-robin",
    [model(id, "gpt-4o", { id: "preferred" }), model(other, "gpt-4o-mini", { id: "fallback" })],
    { maxQueueDepth: 0, stickyRoundRobinLimit: 1 }
  );
  h.installRecordingFetch();
  // Resolve the exact normalized execution key through the same source contract.
  const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
  const stored = await h.combosDb.getComboByName("rr-overflow");
  const targets = resolveComboTargets(stored as unknown as ComboLike, [
    stored as unknown as ComboLike,
  ]);
  const held = await aux.acquire("combo:rr-overflow:" + targets[0].executionKey, {
    maxConcurrency: 1,
  });
  const response = await request("rr-overflow");
  held();
  assert.equal(response.status, 200);
  assert.deepEqual(
    h.calls.map((call) => call.model),
    ["gpt-4o-mini"]
  );
  const connection = await providers.getProviderConnectionById(id);
  assert.equal(connection?.rateLimitedUntil ?? null, null);
});

test("real executor: quota-share never holds qsconn while an older combo turn owns account order", async () => {
  const id = await account();
  await h.settingsDb.updateSettings({
    resilienceSettings: { quotaShareConcurrencyLimit: { enabled: true } },
  });
  await combo("older-capacity", "priority", [model(id, "gpt-4o")]);
  await combo("younger-qs", "quota-share", [model(id)]);
  h.installRecordingFetch();
  const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
  const first = request("older-capacity");
  assert.ok(await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 1, 2000));
  const second = request("younger-qs");
  assert.ok(await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 2, 2000));
  assert.equal(aux.getStats()["qsconn:" + id], undefined);
  held();
  assert.equal((await first).status, 200);
  assert.equal((await second).status, 200);
  assert.deepEqual(
    h.calls.map((call) => call.model),
    ["gpt-4o", "gpt-4o-mini"]
  );
  assert.deepEqual(aux.getStats(), {});
});

for (const nested of [false]) {
  for (const mode of ["within", "expiry", "reset", "cancel"] as const) {
    test(
      "real winning body retains bounded recovery context: " +
        (nested ? "nested/" : "common/") +
        mode,
      { timeout: 15000 },
      async () => {
        const { AsyncLocalStorage } = await import("node:async_hooks");
        const { capacityRequestDeadline } =
          await import("../../open-sse/services/combo/capacityBudgetContext.ts");
        const id = await account();
        const childName = "recovery-child-" + sequence;
        const parentName = "recovery-parent-" + sequence;
        await combo(childName, "priority", [model(id)], { comboTimeoutMs: 20000 });
        if (nested)
          await combo(parentName, "priority", [{ kind: "combo-ref", comboName: childName }], {
            nestedComboMode: "execute",
            comboTimeoutMs: 20000,
          });
        const name = nested ? parentName : childName;
        const allowance = mode === "expiry" ? 300 : 10000;
        await h.settingsDb.updateSettings({
          resilienceSettings: {
            requestQueue: { maxWaitMs: allowance },
            streamRecovery: { enabled: true, continueMidStream: true },
          },
        });
        const enc = new TextEncoder();
        const frame = (content: string) =>
          "data: " +
          JSON.stringify({
            id: "bounded-recovery",
            object: "chat.completion.chunk",
            choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
          }) +
          "\n\n";
        const terminal =
          'data: {"id":"bounded-recovery","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n';
        const send = (content: string) =>
          new Response(frame(content) + terminal, {
            headers: { "content-type": "text/event-stream" },
          });
        const makeRequest = () =>
          h.handleChat(
            h.buildRequest({
              body: {
                model: name,
                stream: true,
                messages: [{ role: "user", content: "bounded winning-body recovery " + mode }],
              },
            })
          );
        // Warm this streaming executor independently of which individual case is selected.
        h.installRecordingFetch(() => send("warm stream"));
        const warm = await makeRequest();
        assert.equal(warm.status, 200);
        await warm.text();
        const cut = Promise.withResolvers<void>();
        const prefix = "prefix-body " + "abcdef".repeat(12000);
        let capturedBound = Infinity,
          canceledSource = 0,
          closedSource = 0,
          sourceDone = false;
        let budgetProbe: (() => number) | undefined;
        let postHandoffRemaining: number | undefined, postHandoffError: string | undefined;
        h.installRecordingFetch((call) => {
          if (call.index > 0) {
            if (mode === "within") {
              assert.ok(
                Date.now() < capturedBound,
                "the actual continuation starts before its original bound"
              );
              assert.equal(
                sem.getStats()["openai:" + id]?.running,
                1,
                "internal recovery reuses its existing account lease"
              );
            }
            return send(prefix.slice(-80) + " recovered suffix");
          }
          budgetProbe = AsyncLocalStorage.bind(() =>
            sem.remainingAccountCapacityBudgetMs(Infinity)
          );
          capturedBound = capacityRequestDeadline("openai:" + id, allowance);
          assert.ok(
            Number.isFinite(capturedBound) && Date.now() < capturedBound,
            "first real dispatch is inside its original admission allowance"
          );
          let ended = false;
          return new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                controller.enqueue(enc.encode(frame(prefix)));
              },
              async pull(controller) {
                if (ended) return;
                ended = true;
                await cut.promise;
                if (!sourceDone) {
                  sourceDone = true;
                  controller.close();
                  closedSource++;
                } // committed content, then a genuine silent cut
              },
              cancel() {
                if (!sourceDone) {
                  sourceDone = true;
                  canceledSource++;
                }
              },
            }),
            { headers: { "content-type": "text/event-stream" } }
          );
        });
        const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
        const response = makeRequest();
        let selected: Response | undefined, consuming: Promise<string> | undefined;
        let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
        try {
          assert.ok(
            await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 1, 2000),
            "actual combo must park before its first send"
          );
          held();
          selected = await response;
          assert.equal(selected.status, 200);
          assert.equal(h.calls.length, 1);
          if (mode === "within") {
            try {
              postHandoffRemaining = budgetProbe!();
            } catch (error) {
              postHandoffError = String((error as { code?: string }).code);
            }
            console.log("WINNING_RECOVERY_SCOPE", {
              nested,
              beforeOriginalBound: Date.now() < capturedBound,
              postHandoffRemaining,
              postHandoffError,
            });
          }
          assert.equal(
            sem.getStats()["openai:" + id]?.running,
            1,
            "winning upstream remains held after headers"
          );
          if (mode === "cancel") {
            reader = selected.body!.getReader();
            assert.equal((await reader.read()).done, false);
            await Promise.race([
              reader.cancel(),
              new Promise<void>((resolve) => setTimeout(resolve, 300)),
            ]);
            cut.resolve();
          } else {
            consuming = selected.text();
            if (mode === "expiry")
              await new Promise((resolve) =>
                setTimeout(resolve, Math.max(0, capturedBound - Date.now() + 20))
              );
            if (mode === "reset") sem.reset("openai:" + id);
            if (mode === "within")
              assert.ok(
                Date.now() < capturedBound,
                "recovery is requested before the same original allowance ends"
              );
            cut.resolve();
            const text = await consuming;
            if (mode === "within") {
              assert.equal(
                h.calls.length,
                2,
                "the selected winner may reopen once within its original budget"
              );
              assert.ok(
                postHandoffRemaining! > 0 && postHandoffError === undefined,
                "the selected body retains its original live context after handoff"
              );
              assert.match(text, /recovered suffix/);
              assert.match(text, /\[DONE\]/);
            } else {
              assert.equal(
                h.calls.length,
                1,
                "expiry or explicit reset cannot dispatch another upstream"
              );
              assert.doesNotMatch(text, /recovered suffix/);
            }
          }
          assert.ok(
            await h.waitFor(
              () =>
                (sem.getStats()["openai:" + id]?.running ?? 0) === 0 &&
                (sem.getStats()["openai:" + id]?.queued ?? 0) === 0,
              2000
            ),
            "body finalization cleans the account context"
          );
          assert.deepEqual(aux.getStats(), {});
          if (mode === "cancel") {
            assert.equal(h.calls.length, 1);
            assert.equal(
              canceledSource + closedSource,
              1,
              "cancellation/final cleanup terminates the single source once"
            );
          }
        } finally {
          held();
          cut.resolve();
          if (reader)
            await Promise.race([
              reader.cancel().catch(() => {}),
              new Promise<void>((resolve) => setTimeout(resolve, 300)),
            ]);
          if (consuming) await consuming.catch(() => "");
          else if (selected?.body)
            await Promise.race([
              selected.body.cancel().catch(() => {}),
              new Promise<void>((resolve) => setTimeout(resolve, 300)),
            ]);
          await response;
        }
      }
    );
  }
}

for (const mode of ["rr-local", "initial-zero", "terminal", "initial-terminal"] as const) {
  test("real RR internal auxiliary retry keeps proven work: " + mode, async () => {
    const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
    const a = await account(),
      b = await account();
    await providers.updateProviderConnection(a, {
      providerSpecificData: { baseUrl: "https://api-inference.modelscope.cn/v1" },
    });
    await h.settingsDb.updateSettings({
      resilienceSettings: {
        requestQueue: { maxWaitMs: 1000 },
        providerCooldown: { enabled: false },
      },
    });
    const childName = "rr-retry-child-" + sequence;
    await combo(
      childName,
      "round-robin",
      [
        model(a, "gpt-4o", { id: "first" }),
        ...(["rr-local", "initial-zero"].includes(mode)
          ? [model(b, "gpt-4o-mini", { id: "second" })]
          : []),
      ],
      {
        maxGlobalAttempts: ["rr-local", "initial-zero", "terminal", "initial-terminal"].includes(
          mode
        )
          ? 1
          : 5,
        queueDepth: 0,
        concurrencyPerModel: 1,
        comboTimeoutMs: 3000,
      }
    );
    const stored = await h.combosDb.getComboByName(childName);
    const targets = resolveComboTargets(stored as unknown as ComboLike, [
      stored as unknown as ComboLike,
    ]);
    const auxKey = "combo:" + childName + ":" + targets[0].executionKey;
    let external: (() => void) | undefined, queuedExternal: Promise<void> | undefined;
    let firstSend = false,
      phasePresent: boolean | undefined;
    if (mode.startsWith("initial")) external = await aux.acquire(auxKey, { maxConcurrency: 1 });
    h.installRecordingFetch((call) => {
      if (call.model !== "gpt-4o") return;
      assert.equal(firstSend, false, "retry auxiliary full prevents any second physical A send");
      firstSend = true;
      phasePresent = sem.captureAccountCapacityExecution() !== null;
      assert.equal(phasePresent, false, "first actual send captures the intended owner boundary");
      assert.equal(
        aux.getStats()[auxKey]?.running,
        1,
        "first real executor acquired the matching RR auxiliary"
      );
      queuedExternal = aux
        .acquire(auxKey, { maxConcurrency: 1, maxQueueSize: 1 })
        .then((release) => {
          external = release;
        });
      return Response.json(
        { error: { message: "Too many requests: throttling", type: "rate_limit_error" } },
        {
          status: 429,
          headers: { "retry-after": "0.05", "modelscope-ratelimit-model-requests-remaining": "99" },
        }
      );
    });
    const pending = request(childName, "actual RR internal auxiliary " + mode);
    try {
      if (!mode.startsWith("initial")) {
        assert.ok(
          await h.waitFor(() => external != null, 2000),
          "queued external auxiliary acquired between first send and internal retry"
        );
        assert.equal(firstSend, true);
      }
      const response = await pending;
      if (mode === "initial-zero") {
        assert.equal(response.status, 200);
        assert.deepEqual(
          h.calls.map((call) => call.model),
          ["gpt-4o-mini"],
          "first auxiliary-full0send refunds exactly once to legitimate RR sibling"
        );
      } else {
        assert.equal(
          response.status,
          503,
          mode === "rr-local"
            ? "RR-local budget1 blocks its second target after a send"
            : "parent unit budget1 blocks external sibling after a send"
        );
        assert.deepEqual(
          h.calls.map((call) => call.model),
          mode === "initial-terminal" ? [] : ["gpt-4o"]
        );
      }
      await response.text();
      const connection = await providers.getProviderConnectionById(a);
      assert.equal(
        connection?.rateLimitedUntil ?? null,
        null,
        "auxiliary rejection creates no provider cooldown"
      );
      external?.();
      await queuedExternal;
      assert.deepEqual(aux.getStats(), {});
    } finally {
      external?.();
      await pending.catch(() => {});
      await queuedExternal?.catch(() => {});
      external?.();
    }
  });
}

test("real executor: prompt-cache expansion waits inside the API-key connection snapshot", async () => {
  const oauthAccount = async (label: string) =>
    String(
      (
        await providers.createProviderConnection({
          provider: "codex",
          authType: "oauth",
          name: "cache-oauth-" + label,
          apiKey: null,
          accessToken: "synthetic-codex-cache-" + label,
          refreshToken: "synthetic-refresh-" + label,
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          isActive: true,
          testStatus: "active",
          maxConcurrent: 1,
          providerSpecificData: { workspacePlanType: "plus", codexTransport: "http" },
        })
      ).id
    );
  const a = await oauthAccount("allowed"),
    b = await oauthAccount("forbidden");
  const name = "capacity-scoped-cache-" + ++sequence;
  const stored = await combo(name, "priority", ["codex/gpt-5.5"], {
    connectionAwareExpansion: false,
  });
  const apiKey = await h.seedApiKey({ allowedConnections: [a] });
  const snapshot = await h.apiKeysDb.getApiKeyById(apiKey.id);
  assert.deepEqual(snapshot?.allowedConnections, [a]);
  const scope = [...snapshot!.allowedConnections];
  const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
  const comboValue = stored as unknown as ComboLike;
  const declared = resolveComboTargets(comboValue, [comboValue]);
  assert.equal(declared.length, 1);
  assert.equal(
    declared[0].connectionId ?? null,
    null,
    "only the prompt-cache stage may bind this originally unbound target"
  );
  const body = {
    model: name,
    stream: false,
    prompt_cache_key: "scoped-busy-allowed-account",
    messages: [{ role: "user", content: "restricted key must wait for its allowed account" }],
  };
  const text = "scoped cache answer";
  h.installRecordingFetch((call) => {
    if (call.url.includes("/usage"))
      return Response.json({
        plan_type: "plus",
        rate_limit: {
          allowed: true,
          limit_reached: false,
          primary_window: { used_percent: 1, reset_at: Math.floor(Date.now() / 1000) + 600 },
          secondary_window: { used_percent: 1, reset_at: Math.floor(Date.now() / 1000) + 3600 },
        },
      });
    assert.ok(call.url.includes("/codex/responses"), "only synthetic Codex dispatch is expected");
    return new Response(
      [
        "event: response.created",
        'data: {"type":"response.created","response":{"id":"resp_cache","model":"gpt-5.5","status":"in_progress","output":[]}}',
        "",
        "event: response.output_text.delta",
        "data: " +
          JSON.stringify({ type: "response.output_text.delta", output_index: 0, delta: text }),
        "",
        "event: response.completed",
        "data: " +
          JSON.stringify({
            type: "response.completed",
            response: {
              id: "resp_cache",
              object: "response",
              model: "gpt-5.5",
              status: "completed",
              output: [
                { type: "message", role: "assistant", content: [{ type: "output_text", text }] },
              ],
              usage: { input_tokens: 6, output_tokens: 4 },
            },
          }),
        "",
        "data: [DONE]",
        "",
      ].join("\n"),
      { headers: { "content-type": "text/event-stream" } }
    );
  });
  const probes: string[] = [],
    selected: Array<{ connectionId: string; executionKey: string }> = [];
  const held = await sem.acquire("codex:" + a, { maxConcurrency: 1 });
  assert.equal(sem.getStats()["codex:" + b]?.running ?? 0, 0, "forbidden B is live and free");
  let settled = false;
  const pending = handleComboChat({
    body,
    combo: comboValue,
    allCombos: [comboValue],
    apiKeyAllowedConnections: scope,
    log,
    settings: {
      promptCacheAffinityEnabled: true,
      resilienceSettings: {
        quotaPreflight: { enabled: false },
        providerCooldown: { enabled: false },
      },
    },
    isModelAvailable: async () => true,
    perTargetAdmission: async ({ executionKey }) => {
      probes.push(String(executionKey));
      return true;
    },
    handleSingleModel: async (targetBody, modelStr, target) => {
      assert.ok(target && "connectionId" in target && "executionKey" in target);
      assert.equal(target.connectionId, a, "the actual combo callback retains expanded account A");
      assert.ok(
        String(target.executionKey).endsWith("@" + a),
        "preserve the @A expansion identity"
      );
      assert.equal("authType" in target ? target.authType : null, "oauth");
      selected.push({
        connectionId: String(target.connectionId),
        executionKey: String(target.executionKey),
      });
      return h.handleChat(
        h.buildRequest({
          authKey: apiKey.key,
          body: { ...targetBody, model: modelStr, stream: false },
        })
      );
    },
  }).then((response) => {
    settled = true;
    return response;
  });
  try {
    assert.ok(
      await h.waitFor(() => sem.getStats()["codex:" + a]?.queued === 1, 2000),
      "the real combo entry must park on its allowed busy account"
    );
    assert.equal(settled, false, "free forbidden B cannot cause early failure or dispatch");
    assert.deepEqual(probes, [], "expanded A must park before the per-target admission hook");
    assert.deepEqual(selected, []);
    assert.deepEqual(h.calls, []);
    assert.equal(sem.getStats()["codex:" + a].running, 1);
    assert.equal(sem.getStats()["codex:" + b]?.queued ?? 0, 0);
    held();
    const response = await pending;
    assert.equal(response.status, 200);
    assert.ok((await response.text()).includes(text));
    assert.equal(selected.length, 1);
    assert.deepEqual(probes, [selected[0].executionKey]);
    const dispatch = h.calls.filter((call) => call.url.includes("/codex/responses"));
    assert.equal(dispatch.length, 1);
    assert.ok(
      h.calls.every((call) => call.authorization === "Bearer synthetic-codex-cache-allowed")
    );
    for (const id of [a, b]) {
      assert.equal(sem.getStats()["codex:" + id]?.queued ?? 0, 0);
      assert.equal(sem.getStats()["codex:" + id]?.running ?? 0, 0);
    }
    assert.deepEqual(scope, [a]);
    assert.deepEqual(
      (await h.apiKeysDb.getApiKeyById(apiKey.id))?.allowedConnections,
      scope,
      "the request keeps its seeded API-key snapshot; no live permission mutation"
    );
  } finally {
    held();
    const result = await pending.catch(() => null);
    if (result && !result.bodyUsed) await result.body?.cancel().catch(() => {});
    const { unregisterCodexConnection } =
      await import("../../open-sse/services/codexQuotaFetcher.ts");
    unregisterCodexConnection(a);
    unregisterCodexConnection(b);
  }
});

for (const strategy of ["round-robin", "quota-share"]) {
  test("legacy nested " + strategy + " joins physical FIFO before auxiliaries", async () => {
    const id = await account();
    await h.settingsDb.updateSettings({
      resilienceSettings: { quotaShareConcurrencyLimit: { enabled: true } },
    });
    const childName = "legacy-physical-" + ++sequence;
    const stored = await combo(childName, strategy, [model(id)]);
    const child = stored as unknown as ComboLike;
    const parent = {
      name: "parent-" + childName,
      strategy: "priority",
      config: { ...config, nestedComboMode: "execute" },
      models: [{ kind: "combo-ref", comboName: childName }],
    };
    const apiKey = await h.seedApiKey({ allowedConnections: [id] });
    const admissionReached = Promise.withResolvers<void>();
    let held: (() => void) | undefined;
    h.installRecordingFetch();
    const older = handleComboChat({
      body: { stream: false, messages: [{ role: "user", content: "legacy nested physical" }] },
      combo: parent,
      allCombos: [parent, child],
      log,
      settings: { resilienceSettings: { quotaShareConcurrencyLimit: { enabled: true } } },
      isModelAvailable: async () => true,
      perTargetAdmission: async () => {
        held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
        admissionReached.resolve();
        return true;
      },
      handleSingleModel: async (body, modelStr) =>
        h.handleChat(h.buildRequest({ authKey: apiKey.key, body: { ...body, model: modelStr } })),
    });
    let younger: Promise<Response> | undefined;
    try {
      await admissionReached.promise;
      assert.ok(await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 1, 2000));
      assert.deepEqual(
        aux.getStats(),
        {},
        "nested executor owns no auxiliary while account is busy"
      );
      younger = request(childName, "younger physical competitor");
      assert.ok(await h.waitFor(() => sem.getStats()["openai:" + id]?.queued === 2, 2000));
      assert.deepEqual(aux.getStats(), {});
      held();
      const first = await older;
      assert.equal(first.status, 200);
      await first.text();
      const second = await younger;
      assert.equal(second.status, 200);
      await second.text();
      assert.equal(h.calls.length, 2);
      assert.deepEqual(aux.getStats(), {});
    } finally {
      held?.();
      await older;
      await younger;
    }
  });
}
