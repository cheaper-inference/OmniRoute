import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17289-"));
const previousDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility, deriveRequestCompatibilityRequirements } =
  await import("../../open-sse/services/combo/comboStructure.ts");
const { rotateWithinVisionTiers } = await import("../../open-sse/services/combo/rrState.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

const log = { info() {}, warn() {}, error() {}, debug() {} };
const request = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Describe image" },
        { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
      ],
    },
  ],
};
const target = (modelStr: string) => ({
  kind: "model" as const,
  stepId: modelStr,
  executionKey: modelStr,
  modelStr,
  provider: modelStr.slice(0, modelStr.indexOf("/")),
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
});
const ids = (targets: ReturnType<typeof target>[]) => targets.map((t) => t.modelStr);

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
});
test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("#17289 WorkBuddy's exact DeepSeek Flash aliases have scoped vision evidence", () => {
  for (const id of ["workbuddy/global:deepseek-v4.1-flash", "workbuddy/cn:deepseek-v4.1-flash"]) {
    assert.equal(getResolvedModelCapabilities(id).supportsVision, true, id);
  }
  assert.notEqual(
    getResolvedModelCapabilities("workbuddy/global:unrelated-unknown-model-17289").supportsVision,
    true
  );
  assert.notEqual(
    getResolvedModelCapabilities("codearts/deepseek-v4.1-flash").supportsVision,
    true,
    "WorkBuddy evidence must not be globalized to a different gateway"
  );
});

test("#17289 confirmed vision takes precedence over unknown; explicit false stays blocked", () => {
  const known = target("workbuddy/global:deepseek-v4.1-flash");
  const unknown = target("workbuddy/unknown-model-17289");
  const blind = target("cmd/gpt-5.3-codex");
  assert.equal(deriveRequestCompatibilityRequirements(request).requiresVision, true);
  assert.equal(getResolvedModelCapabilities(unknown.modelStr).supportsVision, null);
  assert.equal(getResolvedModelCapabilities(blind.modelStr).supportsVision, false);
  assert.deepEqual(
    ids(filterTargetsByRequestCompatibility([unknown, blind, known], request, log)),
    [known.modelStr, unknown.modelStr]
  );
  assert.deepEqual(ids(filterTargetsByRequestCompatibility([unknown, blind], request, log)), [
    unknown.modelStr,
  ]);
  assert.deepEqual(ids(filterTargetsByRequestCompatibility([blind], request, log)), []);
});

test("#17289 priority dispatch reaches an unknown target if no confirmed target exists", async () => {
  const calls: string[] = [];
  const model = "workbuddy/unknown-model-17289";
  const response = await handleComboChat({
    body: request,
    combo: {
      name: "workbuddy-unknown-vision-17289",
      strategy: "priority",
      models: [model],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(calls, [model]);
});

test("#17289 round-robin rotates within the confirmed tier; unknown stays last resort", async () => {
  const confirmed = "mistral/pixtral-12b-latest";
  const unknown = "mistral/ministral-14b-latest";
  // A different provider than the confirmed one: a quota/outage on one provider
  // skips its siblings for the rest of the request (#1731), which would mask the fallback.
  const unknownOtherProvider = "groq/llama-3.1-8b-instant";
  assert.equal(getResolvedModelCapabilities(confirmed).supportsVision, true);
  assert.equal(getResolvedModelCapabilities(unknown).supportsVision, null);
  assert.equal(getResolvedModelCapabilities(unknownOtherProvider).supportsVision, null);
  const run = async (name: string, models: string[], failing: Set<string>) => {
    const calls: string[] = [];
    const combo = { name, strategy: "round-robin", models, config: { maxRetries: 0 } };
    for (let i = 0; i < 4; i++) {
      const response = await handleComboChat({
        body: request,
        combo,
        handleSingleModel: async (_body, modelStr) => {
          calls.push(modelStr);
          if (failing.has(modelStr)) {
            return new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
              status: 503,
              headers: { "content-type": "application/json" },
            });
          }
          return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        },
        isModelAvailable: async () => true,
        log,
        settings: null,
        relayOptions: null,
        allCombos: null,
      });
      assert.equal(response.status, 200, `${name} request ${i}: ${calls.join(",")}`);
    }
    return calls;
  };
  // Healthy confirmed target: every image request is served by it, never by the unknown one.
  assert.deepEqual(await run("rr-vision-healthy-17289", [confirmed, unknown], new Set()), [
    confirmed,
    confirmed,
    confirmed,
    confirmed,
  ]);
  // Order in the combo does not matter: the confirmed tier still goes first.
  assert.deepEqual(await run("rr-vision-reversed-17289", [unknown, confirmed], new Set()), [
    confirmed,
    confirmed,
    confirmed,
    confirmed,
  ]);
  // Confirmed target failing: the unknown target is still reachable as last resort.
  const fallbackCalls = await run(
    "rr-vision-fallback-17289",
    [confirmed, unknownOtherProvider],
    new Set([confirmed])
  );
  assert.ok(
    fallbackCalls.includes(unknownOtherProvider),
    "unknown target must serve when the confirmed one fails"
  );
});

test("#17289 rotateWithinVisionTiers rotates the confirmed prefix, then the unknown tail", () => {
  const order = (start: number, total: number, confirmed: number) =>
    Array.from({ length: total }, (_, offset) =>
      rotateWithinVisionTiers(offset, start, total, confirmed)
    );
  assert.deepEqual(order(0, 4, 0), [0, 1, 2, 3], "no tiering: plain rotation");
  assert.deepEqual(order(2, 4, 0), [2, 3, 0, 1], "no tiering: plain rotation from start");
  assert.deepEqual(order(0, 4, 2), [0, 1, 2, 3]);
  assert.deepEqual(order(1, 4, 2), [1, 0, 2, 3], "confirmed tier rotates, unknown stays last");
  assert.deepEqual(
    order(3, 4, 2),
    [1, 0, 3, 2],
    "start inside the unknown tier still leads with confirmed"
  );
  assert.deepEqual(order(1, 2, 1), [0, 1], "one confirmed target is always first");
});

test("#17289: unknown-vision fallback reports actionable upstream attachment rejection", async () => {
  for (const strategy of ["priority", "round-robin"] as const) {
    const attempted: string[] = [];
    const model = "workbuddy/unconfirmed-upstream-17289";
    assert.equal(
      getResolvedModelCapabilities(model).supportsVision,
      null,
      "fixture must have an unknown-vision model"
    );
    const response = await handleComboChat({
      body: request,
      combo: {
        name: "unknown-vision-upstream-" + strategy,
        strategy,
        models: [model],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return new Response(
          JSON.stringify({
            error: {
              message: "this profile has no attachment handler installed; 无法处理图片",
              code: "unsupported_content",
            },
          }),
          { status: 400, headers: { "content-type": "application/json" } }
        );
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: null,
    });
    assert.deepEqual(attempted, [model], strategy + " must dispatch unknown vision before failing");
    assert.equal(response.status, 400);
    const json = (await response.json()) as { error: { message: string; code?: string } };
    assert.match(
      json.error.message,
      /attachment handler/i,
      "upstream explanation must survive the combo error boundary"
    );
    assert.match(
      json.error.message,
      /无法处理图片/,
      "non-English upstream explanation must not collapse to a generic 400"
    );
    assert.doesNotMatch(
      json.error.message,
      /No target.*confirmed vision support|capability_mismatch/i
    );
  }
});

test("#17289: an empty upstream 404 identifies the attempted model in combo diagnostics", async () => {
  const model = "workbuddy/unconfirmed-404-17289";
  assert.equal(
    getResolvedModelCapabilities(model).supportsVision,
    null,
    "fixture must have an unknown-vision model"
  );
  const response = await handleComboChat({
    body: request,
    combo: {
      name: "unknown-vision-404-detail-17289",
      strategy: "priority",
      models: [model],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () => new Response(null, { status: 404 }),
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(response.status, 404);
  const bodyText = await response.text();
  assert.ok(bodyText.trim(), "combo must synthesize a nonempty JSON error for blank upstream 404");
  const json = JSON.parse(bodyText) as { error: { message: string } };
  assert.match(
    json.error.message,
    /unconfirmed-404-17289/,
    "404 diagnostic must identify which upstream target was attempted"
  );
});

test("#17289: mixed multi-model vision fallback preserves both upstream failure reasons", async () => {
  const confirmed = "mistral/pixtral-12b-latest";
  const unknown = "workbuddy/unconfirmed-mixed-errors-17289";
  assert.equal(
    getResolvedModelCapabilities(confirmed).supportsVision,
    true,
    "fixture must have a confirmed vision model"
  );
  assert.equal(
    getResolvedModelCapabilities(unknown).supportsVision,
    null,
    "fixture must have an unknown-vision model"
  );
  for (const strategy of ["priority", "round-robin"] as const) {
    const calls: string[] = [];
    const response = await handleComboChat({
      body: request,
      combo: {
        name: "vision-upstream-multi-" + strategy,
        strategy,
        // Reverse the intended order: a plain traversal would try unknown first.
        models: [unknown, confirmed],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return modelStr === confirmed
          ? new Response(
              JSON.stringify({ error: { message: "temporary confirmed-model outage" } }),
              {
                status: 503,
                headers: { "content-type": "application/json" },
              }
            )
          : new Response(JSON.stringify({ error: { message: "missing attachment handler" } }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: null,
    });
    assert.deepEqual(
      calls,
      [confirmed, unknown],
      strategy + " must try confirmed vision first and unknown last"
    );
    assert.equal(
      response.status,
      502,
      "heterogeneous upstream errors must aggregate as gateway failure"
    );
    assert.match(response.headers.get("content-type") || "", /application\/json/i);
    const payload = (await response.json()) as {
      error?: { message?: unknown; code?: unknown; type?: unknown };
    };
    assert.equal(
      typeof payload.error?.message,
      "string",
      "combo terminal failure must have a structured client-visible error message"
    );
    const message = payload.error.message as string;
    assert.match(message, /temporary confirmed-model outage/);
    assert.match(message, /missing attachment handler/);
    assert.doesNotMatch(
      JSON.stringify(payload),
      /capability_mismatch|No target in combo .*confirmed vision/i,
      "a dispatched upstream failure must never be misclassified as pre-dispatch capability rejection"
    );
  }
});
