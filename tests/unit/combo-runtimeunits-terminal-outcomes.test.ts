/**
 * Nested runtime-unit combos (runtimeUnits.ts) used to return only the LAST unit's
 * response when every unit failed. An earlier unit's real reason (an empty reply rejected
 * by quality validation, an HTTP 500) was dropped, so a last unit that was merely skipped
 * before dispatch ("Model X is unavailable") became the only error the client saw.
 * The terminal message now lists every failed unit, like the flat loop does (#10314).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { executeRuntimeUnitCombo } from "../../open-sse/services/combo/runtimeUnits.ts";
import { isQuotaExhaustionResponse } from "../../open-sse/services/combo/quotaExhaustion.ts";
import type {
  ResolvedComboUnit,
  ComboNestingContext,
} from "../../open-sse/services/combo/types.ts";

function noopLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function modelUnit(modelStr: string, key: string): ResolvedComboUnit {
  return {
    kind: "model",
    stepId: `step-${key}`,
    executionKey: key,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

function nesting(name: string, limit = 8): ComboNestingContext {
  return {
    depth: 0,
    maxDepth: 5,
    visitedComboNames: [],
    rootComboName: name,
    attemptBudget: { count: 0, limit },
  };
}

function jsonError(status: number, message: string, code?: string): Response {
  return new Response(JSON.stringify({ error: { message, ...(code ? { code } : {}) } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function emptyCompletion(): Response {
  return new Response(
    JSON.stringify({
      choices: [{ index: 0, message: { role: "assistant", content: "" }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

async function run(args: {
  name: string;
  units: ResolvedComboUnit[];
  respond: (model: string) => Response;
  available?: (model: string) => boolean;
  maxRetries?: number;
  limit?: number;
}) {
  const calls: string[] = [];
  const result = await executeRuntimeUnitCombo({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { name: args.name, strategy: "priority" },
    strategy: "priority",
    units: args.units,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return args.respond(modelStr);
    },
    isModelAvailable: args.available ? async (model) => args.available!(model) : undefined,
    log: noopLog() as never,
    config: { maxRetries: args.maxRetries ?? 0, retryDelayMs: 0 },
    allCombos: [],
    nesting: nesting(args.name, args.limit),
    baseOptions: {} as never,
    runCombo: async () => jsonError(500, "unused"),
  });
  return { result, calls };
}

test("empty reply rejected by quality validation, then a pre-dispatch skip: both reasons reach the client", async () => {
  const { result, calls } = await run({
    name: "ru-terminal-quality-skip",
    units: [modelUnit("claude/opus-a", "a"), modelUnit("agy/opus-b", "b")],
    respond: () => emptyCompletion(),
    available: (model) => model !== "agy/opus-b",
  });

  assert.deepEqual(calls, ["claude/opus-a"], "the skipped unit is never dispatched");
  assert.equal(result.unit, null);
  // Status stays the last unit's (unchanged behavior); only the message is aggregated.
  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as { error: { message: string } };
  const message = body.error.message;
  assert.match(message, /claude\/opus-a: quality validation — empty content/);
  assert.match(message, /agy\/opus-b: skipped — Model agy\/opus-b is unavailable \(HTTP 503\)/);
  assert.notEqual(message, "Model agy/opus-b is unavailable");
});

test("two HTTP failures (500 then 429): both are listed", async () => {
  const { result } = await run({
    name: "ru-terminal-http",
    units: [modelUnit("openai/ru-a", "a"), modelUnit("anthropic/ru-b", "b")],
    respond: (model) =>
      model === "openai/ru-a" ? jsonError(500, "upstream boom") : jsonError(429, "slow down"),
  });

  assert.equal(result.response.status, 429);
  const body = (await result.response.json()) as { error: { message: string } };
  assert.match(body.error.message, /openai\/ru-a: provider — upstream boom \(HTTP 500\)/);
  assert.match(body.error.message, /anthropic\/ru-b: rate limit — slow down \(HTTP 429\)/);
});

test("retries of one unit do not count as several units: single-unit failure is unchanged", async () => {
  const { result, calls } = await run({
    name: "ru-terminal-single",
    units: [modelUnit("openai/ru-a", "a")],
    respond: () => jsonError(500, "upstream boom"),
    maxRetries: 1,
  });

  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 500);
  const body = (await result.response.json()) as { error: { message: string } };
  assert.equal(body.error.message, "upstream boom");
});

test("a single unit skipped before dispatch keeps the original message", async () => {
  const { result, calls } = await run({
    name: "ru-terminal-single-skip",
    units: [modelUnit("agy/opus-b", "b")],
    respond: () => jsonError(500, "unused"),
    available: () => false,
  });

  assert.deepEqual(calls, []);
  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Model agy/opus-b is unavailable");
});

test("quota classification, error code and headers survive the message rewrite", async () => {
  const { result } = await run({
    name: "ru-terminal-quota",
    units: [modelUnit("openai/ru-a", "a"), modelUnit("anthropic/ru-b", "b")],
    respond: (model) =>
      new Response(
        JSON.stringify({
          error: {
            message: `credits exhausted on ${model}`,
            code: "insufficient_quota",
            retry_after: 30,
          },
        }),
        {
          status: 429,
          headers: { "content-type": "application/json", "retry-after": "30" },
        }
      ),
  });

  assert.equal(result.response.status, 429);
  assert.equal(result.response.headers.get("retry-after"), "30");
  assert.equal(await isQuotaExhaustionResponse(result.response, null, null), true);
  const body = (await result.response.json()) as {
    error: { message: string; code: string; retry_after: number };
  };
  assert.equal(body.error.code, "insufficient_quota");
  assert.equal(body.error.retry_after, 30);
  assert.match(body.error.message, /credits exhausted on openai\/ru-a/);
  assert.match(body.error.message, /credits exhausted on anthropic\/ru-b/);
});

test("the attempt-budget terminal (diagnostics) path is untouched", async () => {
  const { result } = await run({
    name: "ru-terminal-budget",
    units: [modelUnit("openai/ru-a", "a"), modelUnit("anthropic/ru-b", "b")],
    respond: () => jsonError(500, "upstream boom"),
    limit: 1,
  });

  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as {
    error: { message: string };
    diagnostics?: { terminalReason: string };
  };
  assert.equal(body.error.message, "Maximum combo retry limit reached");
  assert.equal(body.diagnostics?.terminalReason, "max_attempts_exceeded");
});

test("connection identifiers in a unit's error text are redacted in the aggregated message", async () => {
  const { result } = await run({
    name: "ru-terminal-redact",
    units: [modelUnit("openai/ru-a", "a"), modelUnit("anthropic/ru-b", "b")],
    respond: (model) =>
      model === "openai/ru-a"
        ? jsonError(401, "invalid key for connection 0f8fad5b-d9cb-469f-a165-70867728950e")
        : jsonError(500, "upstream boom"),
  });

  const body = (await result.response.json()) as { error: { message: string } };
  assert.doesNotMatch(body.error.message, /0f8fad5b-d9cb-469f-a165-70867728950e/);
  assert.match(body.error.message, /conn:0f8fad5b/);
});
