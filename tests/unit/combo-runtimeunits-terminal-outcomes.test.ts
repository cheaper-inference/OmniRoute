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
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: () => emptyCompletion(),
    available: (model) => model !== "provider-b/model-y",
  });

  assert.deepEqual(calls, ["provider-a/model-x"], "the skipped unit is never dispatched");
  assert.equal(result.unit, null);
  // Status stays the last unit's (unchanged behavior); only the message is aggregated.
  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as { error: { message: string } };
  const message = body.error.message;
  assert.match(message, /provider-a\/model-x: quality validation — empty content/);
  assert.match(
    message,
    /provider-b\/model-y: skipped — Model provider-b\/model-y is unavailable \(HTTP 503\)/
  );
  assert.notEqual(message, "Model provider-b/model-y is unavailable");
});

test("two HTTP failures (500 then 429): both are listed", async () => {
  const { result } = await run({
    name: "ru-terminal-http",
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: (model) =>
      model === "provider-a/model-x"
        ? jsonError(500, "upstream boom")
        : jsonError(429, "slow down"),
  });

  assert.equal(result.response.status, 429);
  const body = (await result.response.json()) as { error: { message: string } };
  assert.match(body.error.message, /provider-a\/model-x: provider — upstream boom \(HTTP 500\)/);
  assert.match(body.error.message, /provider-b\/model-y: rate limit — slow down \(HTTP 429\)/);
});

test("retries of one unit do not count as several units: single-unit failure is unchanged", async () => {
  const { result, calls } = await run({
    name: "ru-terminal-single",
    units: [modelUnit("provider-a/model-x", "a")],
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
    units: [modelUnit("provider-b/model-y", "b")],
    respond: () => jsonError(500, "unused"),
    available: () => false,
  });

  assert.deepEqual(calls, []);
  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Model provider-b/model-y is unavailable");
});

test("quota classification, error code and headers survive the message rewrite", async () => {
  const { result } = await run({
    name: "ru-terminal-quota",
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
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
  assert.match(body.error.message, /credits exhausted on provider-a\/model-x/);
  assert.match(body.error.message, /credits exhausted on provider-b\/model-y/);
});

test("the attempt-budget terminal (diagnostics) path is untouched", async () => {
  const { result } = await run({
    name: "ru-terminal-budget",
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
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
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: (model) =>
      model === "provider-a/model-x"
        ? jsonError(401, "invalid key for connection 0f8fad5b-d9cb-469f-a165-70867728950e")
        : jsonError(500, "upstream boom"),
  });

  const body = (await result.response.json()) as { error: { message: string } };
  assert.doesNotMatch(body.error.message, /0f8fad5b-d9cb-469f-a165-70867728950e/);
  assert.match(body.error.message, /conn:0f8fad5b/);
});

// Each unit's reason is collapsed to one line, sanitized and capped before the reasons are
// joined. Without that, the whole-message sanitize pass (first line only, 4096 chars, path
// spans run to the end) let one raw upstream body in an early unit hide every later unit.
async function earlyReasonThenSkip(name: string, first: () => Response) {
  const { result } = await run({
    name,
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: () => first(),
    available: (model) => model !== "provider-b/model-y",
  });
  assert.equal(result.response.status, 503);
  const body = (await result.response.json()) as { error: { message: string } };
  return body.error.message;
}

const SKIPPED_LAST =
  /provider-b\/model-y: skipped — Model provider-b\/model-y is unavailable \(HTTP 503\)/;

test("a multi-line reason in an earlier unit does not hide the later units", async () => {
  const message = await earlyReasonThenSkip("ru-terminal-multiline", () =>
    jsonError(500, "first line of unit a\nsecond line of unit a")
  );
  assert.match(message, /provider-a\/model-x: provider — first line of unit a second line/);
  assert.match(message, SKIPPED_LAST);
  assert.doesNotMatch(message, /\n/);
});

test("an HTML 502 page in an earlier unit does not hide the later units", async () => {
  const html =
    "<html>\r\n<head><title>502 Bad Gateway</title></head>\r\n<body>\r\n" +
    "<center><h1>502 Bad Gateway</h1></center>\r\n</body>\r\n</html>\r\n";
  const message = await earlyReasonThenSkip(
    "ru-terminal-html",
    () => new Response(html, { status: 502, headers: { "content-type": "text/html" } })
  );
  assert.match(message, /provider-a\/model-x: .*502 Bad Gateway.*\(HTTP 502\)/);
  assert.match(message, SKIPPED_LAST);
  assert.doesNotMatch(message, /[\r\n]/);
});

test("a multi-line error inside a 200 body (quality reason) does not hide the later units", async () => {
  const message = await earlyReasonThenSkip(
    "ru-terminal-200-error",
    () =>
      new Response(
        JSON.stringify({ error: { message: "Upstream overloaded.\nPlease retry later." } }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
  );
  assert.match(
    message,
    /provider-a\/model-x: quality validation — upstream error in 200 body: Upstream overloaded\. Please retry later\./
  );
  assert.match(message, SKIPPED_LAST);
});

test("an oversized reason in an earlier unit is capped per unit", async () => {
  const message = await earlyReasonThenSkip("ru-terminal-long", () =>
    jsonError(500, "x".repeat(6000))
  );
  const first = message.split("; ")[0];
  assert.ok(first.length < 400, `first unit entry is capped, got ${first.length} chars`);
  assert.match(message, SKIPPED_LAST);
});

test("a path in an earlier unit's reason is redacted without swallowing the later units", async () => {
  const message = await earlyReasonThenSkip("ru-terminal-path", () =>
    jsonError(500, "failed reading /tmp/omniroute-test/cache.bin")
  );
  assert.match(message, /provider-a\/model-x: provider — failed reading <path>/);
  assert.doesNotMatch(message, /omniroute-test/);
  assert.match(message, SKIPPED_LAST);
});

// Connection identifiers are redacted before each reason is capped: an identifier cut in
// half at the cap no longer matches the redaction and would leak most of its characters.
async function twoUnitMessage(name: string, firstStatus: number, firstReason: string) {
  const { result } = await run({
    name,
    units: [modelUnit("provider-a/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: (model) =>
      model === "provider-a/model-x"
        ? jsonError(firstStatus, firstReason)
        : jsonError(503, "second unit down"),
  });
  const body = (await result.response.json()) as { error: { message: string } };
  return body.error.message;
}

const SECOND_DOWN = /provider-b\/model-y: provider — second unit down \(HTTP 503\)$/;

test("a connection UUID that straddles the per-unit cap is still redacted", async () => {
  const message = await twoUnitMessage(
    "ru-terminal-uuid-cap",
    500,
    "p".repeat(259) + " conn 0f8fad5b-d9cb-469f-a165-70867728950e x"
  );
  assert.doesNotMatch(message, /0f8fad5b-d9cb/);
  assert.match(message, /conn conn:0f8fad5b/);
  assert.match(message, SECOND_DOWN);
});

test("a long hex identifier that straddles the per-unit cap is still redacted", async () => {
  const message = await twoUnitMessage(
    "ru-terminal-hex-cap",
    500,
    "p".repeat(280) + " acct 9a8b7c6d5e4f30211a2b3c4d5e6f7081 x"
  );
  assert.doesNotMatch(message, /9a8b7c6d5e/);
  assert.match(message, /acct conn:9a8b7c6d/);
  assert.match(message, SECOND_DOWN);
});

test("a free-tier refusal whose signal sits past the per-unit cap keeps its label", async () => {
  const { result } = await run({
    name: "ru-terminal-free-tier-late",
    units: [modelUnit("opencode/model-x", "a"), modelUnit("provider-b/model-y", "b")],
    respond: (model) =>
      model === "opencode/model-x"
        ? jsonError(403, "Request refused. " + "w".repeat(320) + " FreeTierError")
        : jsonError(503, "second unit down"),
  });
  const body = (await result.response.json()) as { error: { message: string } };
  assert.match(body.error.message, /^opencode\/model-x: access restriction — Request refused\./);
  assert.doesNotMatch(body.error.message, /FreeTierError/);
  assert.match(body.error.message, SECOND_DOWN);
});

test("the per-unit cap does not split a character in half", async () => {
  const message = await twoUnitMessage(
    "ru-terminal-surrogate-cap",
    500,
    "x".repeat(299) + "😀😀😀"
  );
  assert.doesNotMatch(message, /[\ud800-\udbff](?![\udc00-\udfff])/);
  assert.match(message, /provider-a\/model-x: provider — x+ \(HTTP 500\)/);
  assert.match(message, SECOND_DOWN);
});
