/**
 * #12913: the active-stream watchdog never resets on upstream bytes.
 * - STREAM_ACTIVE_TIMEOUT_MS unset: every stream gets the 21-minute default, and a
 *   target that declares a longer budget raises its own cap to that budget plus a
 *   one-minute margin (never lower than the default).
 * - A positive STREAM_ACTIVE_TIMEOUT_MS is a hard cap no declared budget can raise.
 * - 0 turns the watchdog off.
 * These tests pin the resolver, the declared-budget lookup that feeds it, the env
 * reading, and the wiring from the streaming tail to the stream.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  DEFAULT_STREAM_ACTIVE_TIMEOUT_MS,
  MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
  MAX_TIMER_TIMEOUT_MS,
  getUpstreamTimeoutConfig,
  readStreamActiveTimeoutOverrideMs,
} from "../../src/shared/utils/runtimeTimeouts.ts";
import { GLM_TIMEOUT_MS } from "../../open-sse/config/glmProvider.ts";
import { codexProvider } from "../../open-sse/config/providers/registry/codex/index.ts";
import {
  resolveConnectionTimeoutMs,
  resolveDeclaredTargetTimeoutMs,
  resolveStreamActiveTimeoutMs,
  resolveTargetStreamActiveTimeoutMs,
} from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";

const { assembleStreamingPipeline } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");

const ROOT = path.resolve(import.meta.dirname, "../..");
const STREAMING_TAIL = "open-sse/handlers/chatCore/streamingTail.ts";

const codexLongModel = codexProvider.models.find(
  (model) => typeof model.timeoutMs === "number" && model.timeoutMs >= 1_200_000
);

// ── 1. resolver semantics ────────────────────────────────────────────────────

test("unset: a target that declares no budget keeps the default cap", () => {
  for (const declared of [undefined, 0, -1, Number.NaN]) {
    assert.equal(
      resolveStreamActiveTimeoutMs(undefined, declared),
      DEFAULT_STREAM_ACTIVE_TIMEOUT_MS
    );
  }
});

test("unset: a declared budget above the default raises it to the budget plus the margin", () => {
  assert.equal(
    resolveStreamActiveTimeoutMs(undefined, GLM_TIMEOUT_MS),
    GLM_TIMEOUT_MS + MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS
  );
});

test("unset: a declared budget below the default never lowers it", () => {
  assert.equal(resolveStreamActiveTimeoutMs(undefined, 120_000), DEFAULT_STREAM_ACTIVE_TIMEOUT_MS);
});

test("a positive STREAM_ACTIVE_TIMEOUT_MS is a hard cap a declared budget cannot raise", () => {
  assert.equal(resolveStreamActiveTimeoutMs(600_000, GLM_TIMEOUT_MS), 600_000);
  assert.equal(resolveStreamActiveTimeoutMs(600_000, 1_200_000), 600_000);
  assert.equal(resolveStreamActiveTimeoutMs(600_000, undefined), 600_000);
  assert.equal(
    resolveStreamActiveTimeoutMs(DEFAULT_STREAM_ACTIVE_TIMEOUT_MS, GLM_TIMEOUT_MS),
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS,
    "setting the default value explicitly is still a hard cap"
  );
  assert.equal(
    resolveStreamActiveTimeoutMs(4_000_000, GLM_TIMEOUT_MS),
    4_000_000,
    "an operator may also choose a cap above any declared budget"
  );
});

test("STREAM_ACTIVE_TIMEOUT_MS=0 disables the watchdog even for long budgets", () => {
  const disabled = readStreamActiveTimeoutOverrideMs({ STREAM_ACTIVE_TIMEOUT_MS: "0" });
  assert.equal(disabled, 0);
  assert.equal(
    getUpstreamTimeoutConfig({ STREAM_ACTIVE_TIMEOUT_MS: "0" }).streamActiveTimeoutMs,
    0
  );
  assert.ok(codexLongModel, "precondition: a Codex model declares a 20-minute budget");
  assert.equal(
    resolveStreamActiveTimeoutMs(
      disabled,
      resolveDeclaredTargetTimeoutMs("codex", codexLongModel.id)
    ),
    0
  );
  assert.equal(resolveStreamActiveTimeoutMs(disabled, GLM_TIMEOUT_MS), 0);
});

test("a value beyond the timer range is clamped, not wrapped to fire instantly", () => {
  assert.equal(
    resolveStreamActiveTimeoutMs(undefined, Number.MAX_SAFE_INTEGER),
    MAX_TIMER_TIMEOUT_MS
  );
  assert.equal(resolveStreamActiveTimeoutMs(3_000_000_000, undefined), MAX_TIMER_TIMEOUT_MS);
});

// ── 2. reading the operator value ────────────────────────────────────────────

test("only a valid STREAM_ACTIVE_TIMEOUT_MS counts as the operator's own value", () => {
  assert.equal(readStreamActiveTimeoutOverrideMs({}), undefined, "unset");
  assert.equal(readStreamActiveTimeoutOverrideMs({ STREAM_ACTIVE_TIMEOUT_MS: " " }), undefined);
  assert.equal(readStreamActiveTimeoutOverrideMs({ STREAM_ACTIVE_TIMEOUT_MS: "-1" }), undefined);
  assert.equal(readStreamActiveTimeoutOverrideMs({ STREAM_ACTIVE_TIMEOUT_MS: "abc" }), undefined);
  assert.equal(
    readStreamActiveTimeoutOverrideMs({ STREAM_ACTIVE_TIMEOUT_MS: "600000.7" }),
    600_000
  );
  assert.equal(
    readStreamActiveTimeoutOverrideMs({ REQUEST_TIMEOUT_MS: "25000" }),
    undefined,
    "REQUEST_TIMEOUT_MS does not set the active cap"
  );
  // getUpstreamTimeoutConfig keeps reporting the effective global value as before.
  assert.equal(
    getUpstreamTimeoutConfig({}).streamActiveTimeoutMs,
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS
  );
  assert.equal(
    getUpstreamTimeoutConfig({ STREAM_ACTIVE_TIMEOUT_MS: "abc" }).streamActiveTimeoutMs,
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS
  );
});

// ── 3. declared budget lookup: connection → model → provider ────────────────

test("the declared budget comes from the connection, then the model, then the provider", () => {
  assert.ok(codexLongModel);
  const connectionTimeoutMs = resolveConnectionTimeoutMs({ timeoutMs: 1_800_000 });
  assert.equal(connectionTimeoutMs, 1_800_000);
  assert.equal(
    resolveDeclaredTargetTimeoutMs("codex", codexLongModel.id, connectionTimeoutMs),
    1_800_000,
    "a connection override outranks the registry"
  );
  assert.equal(
    resolveDeclaredTargetTimeoutMs("codex", codexLongModel.id),
    codexLongModel.timeoutMs,
    "a per-model budget comes next"
  );
  assert.equal(
    resolveDeclaredTargetTimeoutMs("glm", "glm-4.6"),
    GLM_TIMEOUT_MS,
    "a provider-level budget applies when the model declares none"
  );
  assert.equal(resolveDeclaredTargetTimeoutMs("openai", "gpt-4o"), undefined);
  assert.equal(resolveDeclaredTargetTimeoutMs(undefined, undefined), undefined);
});

test("a target with no declaration keeps the 21-minute wall that bounds endless streams", () => {
  for (const [provider, model] of [
    ["openai", "gpt-4o"],
    ["claude", "claude-sonnet-4-5-20250929"],
    ["gemini", "gemini-2.5-pro"],
  ]) {
    assert.equal(
      resolveStreamActiveTimeoutMs(undefined, resolveDeclaredTargetTimeoutMs(provider, model)),
      1_260_000,
      `${provider}/${model} must not lose its active wall`
    );
  }
});

test("the per-target cap reads the connection's providerSpecificData.timeoutMs", () => {
  const credentials = { providerSpecificData: { timeoutMs: 3_600_000 } };
  assert.equal(
    resolveTargetStreamActiveTimeoutMs(undefined, "openai", "gpt-4o", credentials),
    3_600_000 + MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
    "the connection budget raises the cap"
  );
  assert.equal(
    resolveTargetStreamActiveTimeoutMs(undefined, "openai", "gpt-4o", {
      vendorSpecificData: { timeoutMs: 3_600_000 },
    } as never),
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS,
    "only providerSpecificData is a connection budget"
  );
  assert.equal(
    resolveTargetStreamActiveTimeoutMs(undefined, "glm", "glm-4.6", null),
    GLM_TIMEOUT_MS + MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
    "no credentials falls through to the registry"
  );
  assert.equal(
    resolveTargetStreamActiveTimeoutMs(600_000, "openai", "gpt-4o", credentials),
    600_000,
    "an operator cap still wins over the connection budget"
  );
});

// ── 3. wiring ───────────────────────────────────────────────────────────────

test("the resolved active budget reaches pipeWithDisconnect", () => {
  let seen: Record<string, unknown> | undefined;
  const stream = { pipeThrough: () => stream };
  const deps = {
    wantsProgress: () => false,
    pipeWithDisconnect: (...args: unknown[]) => {
      seen = args[3] as Record<string, unknown>;
      return stream;
    },
    isFeatureFlagEnabled: () => false,
    createPiiSseTransform: () => ({ pipeThrough: () => stream }),
    createCredentialSseTransform: () => ({ pipeThrough: () => stream }),
    createProgressTransform: () => ({ pipeThrough: () => stream }),
    createSseHeartbeatTransform: () => ({ pipeThrough: () => stream }),
    shapeForClientFormat: (format: unknown) => format,
    createModelEchoTransform: () => ({ pipeThrough: () => stream }),
  } as Parameters<typeof assembleStreamingPipeline>[1];

  assembleStreamingPipeline(
    {
      providerResponse: {},
      transformStream: {},
      streamController: { signal: {} as AbortSignal },
      createPiiTransform: undefined,
      clientRawRequestHeaders: {},
      clientResponseFormat: "openai",
      echoModel: null,
      responseHeaders: {},
      contentStallTimeoutMs: 80_000,
      activeTimeoutMs: 3_060_000,
    } as Parameters<typeof assembleStreamingPipeline>[0],
    deps
  );

  assert.equal(seen?.activeTimeoutMs, 3_060_000, "activeTimeoutMs must be forwarded, not dropped");
  assert.equal(seen?.contentStallTimeoutMs, 80_000, "the existing stall budget must keep flowing");
});

test("the streaming tail hands the per-target cap to the stream pipeline", () => {
  const source = readFileSync(path.join(ROOT, STREAMING_TAIL), "utf8");
  const call = source.slice(source.indexOf("assembleStreamingPipeline({"));
  assert.ok(call.length > 0, "precondition: streamingTail calls assembleStreamingPipeline");
  const pipelineArgs = call.slice(0, call.indexOf("});"));
  assert.match(
    pipelineArgs,
    /activeTimeoutMs:\s*resolveTargetStreamActiveTimeoutMs\(\s*STREAM_ACTIVE_TIMEOUT_OVERRIDE_MS,\s*provider,\s*model,\s*credentials\s*\)/,
    "activeTimeoutMs must be resolved per target from this request's provider, model and credentials"
  );
  assert.doesNotMatch(
    source,
    /vendorSpecificData/,
    "connection budgets live in providerSpecificData"
  );
});
