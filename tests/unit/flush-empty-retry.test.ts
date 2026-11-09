import test from "node:test";
import assert from "node:assert/strict";

const {
  isUselessEmptyTurn,
  hasUsableContentText,
  summarizeReplayedUpstreamTurn,
  readBoundedResponseText,
  readBoundedResponseOutcome,
  judgeBufferedTurn,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
  pickEmptyTurnRetryCredentials,
  swapCredentialsInPlace,
} = await import("../../open-sse/utils/emptyTurnRetry.ts");
const { isEmptyTurnCore } = await import("../../open-sse/utils/streamEmptyChoices.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const base = {
  finishReason: "stop",
  contentText: "",
  reasoningText: "",
  forwardedValuableChunk: false,
  hasValidUsage: false,
  toolCallsPresent: false,
};

test("reasoning-only turn: stop + empty text + non-empty reasoning is an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, reasoningText: "some thinking trace" }), true);
});

test("zero-valuable-chunk turn: no valuable chunks and no valid usage is an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, finishReason: "" }), true);
});

test("non-empty content text is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, contentText: "hello" }), false);
});

test("valid usage alone is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, hasValidUsage: true }), false);
});

test("forwarded valuable chunk alone is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, forwardedValuableChunk: true }), false);
});

test("legit finish reasons are not empty turns", () => {
  for (const finishReason of ["length", "tool_calls", "content_filter"]) {
    assert.equal(isUselessEmptyTurn({ ...base, finishReason }), false);
  }
});

test("tool calls present are not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, toolCallsPresent: true }), false);
});

test("shared core matches the frozen guard condition", () => {
  assert.equal(isEmptyTurnCore(false, false), true);
  assert.equal(isEmptyTurnCore(true, false), false);
  assert.equal(isEmptyTurnCore(false, true), false);
});

/**
 * #17461: a turn whose whole output is draft/system-echo markup
 * (`<summary>…</summary>`, `<analysis>…</analysis>`) carries no answer — the
 * client strips the tags and is left with an empty turn. It must count as an
 * empty turn so the recovery path can retry it on another connection.
 */
test("draft-only content is an empty turn (#17461)", () => {
  assert.equal(
    isUselessEmptyTurn({
      ...base,
      contentText: "<summary>draft</summary>\n<analysis>draft</analysis>",
      forwardedValuableChunk: true,
    }),
    true
  );
  assert.equal(
    isUselessEmptyTurn({
      ...base,
      contentText: "<summary>draft</summary>",
      hasValidUsage: true,
    }),
    true
  );
});

test("real content next to draft markup is not an empty turn (#17461)", () => {
  assert.equal(
    isUselessEmptyTurn({
      ...base,
      contentText: "<summary>draft</summary>\nThe actual answer.",
    }),
    false
  );
});

test("hasUsableContentText ignores draft-only text and keeps real text (#17461)", () => {
  assert.equal(hasUsableContentText(""), false);
  assert.equal(hasUsableContentText("   \n "), false);
  assert.equal(hasUsableContentText("<summary>draft</summary>"), false);
  assert.equal(hasUsableContentText("<summary>draft</summary>\n<analysis>draft</analysis>"), false);
  assert.equal(hasUsableContentText("<summary>draft</summary>answer"), true);
  assert.equal(hasUsableContentText("hello"), true);
  // Repeated use must stay stable (the matcher is a global regex).
  assert.equal(hasUsableContentText("<summary>draft</summary>"), false);
  assert.equal(hasUsableContentText("<summary>draft</summary>"), false);
});

/**
 * A block carrying >= SYSTEM_ECHO_THRESHOLD chars of content is the model's real
 * response (the Claude Code compaction shape), not a draft skeleton — same
 * exemption `directivePreambleStripper` applies. It must never be retried as empty.
 */
test("long analysis+summary compaction reply is usable content, not an empty turn (#17461)", () => {
  const compaction =
    "<analysis>" + "a".repeat(3000) + "</analysis>\n<summary>" + "s".repeat(5000) + "</summary>";
  assert.equal(hasUsableContentText(compaction), true);
  assert.equal(
    isUselessEmptyTurn({ ...base, contentText: compaction, forwardedValuableChunk: true }),
    false
  );
  assert.equal(isUselessEmptyTurn({ ...base, contentText: compaction }), false);
  // A single large block is enough, whatever its tag.
  assert.equal(hasUsableContentText("<summary>" + "s".repeat(1000) + "</summary>"), true);
  // Just under the threshold a block is still a draft skeleton.
  assert.equal(hasUsableContentText("<summary>" + "s".repeat(999) + "</summary>"), false);
  assert.equal(
    hasUsableContentText(
      "<analysis>" + "a".repeat(999) + "</analysis><summary>" + "s".repeat(999) + "</summary>"
    ),
    false
  );
});

/**
 * Behavior note (#17461): whitespace-only text used to count as content
 * (`length > 0`). It no longer does, so such a turn falls through to the
 * reasoning-only / zero-valuable-chunk arms instead of being waved through.
 */
test("whitespace-only content is not usable and falls through to the other arms (#17461)", () => {
  assert.equal(hasUsableContentText("\n"), false);
  assert.equal(hasUsableContentText(" \t\r\n "), false);
  // Reasoning + stop + blank text: retryable (reasoning-only arm).
  assert.equal(
    isUselessEmptyTurn({ ...base, contentText: "\n", reasoningText: "some thinking trace" }),
    true
  );
  // Nothing forwarded, no usage: retryable (core arm).
  assert.equal(isUselessEmptyTurn({ ...base, contentText: "\n", finishReason: "" }), true);
  // A blank text next to a real forwarded chunk / usage stays a normal turn.
  assert.equal(
    isUselessEmptyTurn({ ...base, contentText: "\n", forwardedValuableChunk: true }),
    false
  );
  assert.equal(isUselessEmptyTurn({ ...base, contentText: "\n", hasValidUsage: true }), false);
});

test("memory cap is a positive bound", () => {
  assert.ok(FLUSH_EMPTY_RETRY_MAX_BYTES > 0);
});

function sse(...frames: string[]): string {
  return frames.map((f) => `data: ${f}\n\n`).join("") + "data: [DONE]\n\n";
}

const chatChunk = (delta: Record<string, unknown>, finish: string | null = null) =>
  JSON.stringify({
    id: "chatcmpl-probe",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [{ delta, finish_reason: finish }],
  });

test("replay: reasoning-only chat turn classifies empty (parity with live transform)", () => {
  const body = sse(chatChunk({ reasoning_content: "thinking trace here" }), chatChunk({}, "stop"));
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(summary.reasoningText.length > 0, true);
  assert.equal(summary.contentText, "");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("replay: all-empty choices turn classifies empty", () => {
  const body = sse(
    JSON.stringify({
      id: "chatcmpl-probe",
      object: "chat.completion.chunk",
      model: "probe",
      choices: [],
    })
  );
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("replay: turn with real content classifies useful", () => {
  const body = sse(chatChunk({ content: "hello" }), chatChunk({}, "stop"));
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), false);
});

test("replay: retry with content after empty first turn serves content", () => {
  const attempts = [
    sse(chatChunk({ reasoning_content: "only thinking" }), chatChunk({}, "stop")),
    sse(chatChunk({ content: "real answer" }), chatChunk({}, "stop")),
  ];
  let calls = 0;
  for (const body of attempts) {
    calls++;
    const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
    assert.ok(summary);
    if (calls === 1) {
      assert.equal(isUselessEmptyTurn(summary), true);
      continue;
    }
    assert.equal(isUselessEmptyTurn(summary), false);
  }
  assert.equal(calls, 2, "exactly 2 attempts: initial + 1 retry");
});

test("replay: retry also empty stays empty (fall back to current behavior)", () => {
  const body = sse(
    JSON.stringify({
      id: "chatcmpl-probe",
      object: "chat.completion.chunk",
      model: "probe",
      choices: [],
    })
  );
  for (let attempt = 0; attempt < 2; attempt++) {
    const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
    assert.ok(summary);
    assert.equal(isUselessEmptyTurn(summary), true);
  }
});

test("bounded read abandons past the cap without buffering everything", async () => {
  const big = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode("data: " + "x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1) + "\n\n")
      );
      controller.close();
    },
  });
  const res = new Response(big, { status: 200 });
  const out = await readBoundedResponseText(res, FLUSH_EMPTY_RETRY_MAX_BYTES);
  assert.equal(out, null, "past-cap body must be abandoned, not buffered");
});

// #14691: a turn that already carries content or a tool call stops the bounded read at its
// first useful chunk (`early-pass`); only content-free turns are drained to the end. The
// "intact body" contract therefore applies to a content-free (reasoning-only) turn.
const contentFreeBody = () =>
  sse(chatChunk({ reasoning_content: "thinking" }), chatChunk({}, "stop"));

test("bounded read returns small bodies intact", async () => {
  const body = contentFreeBody();
  const res = new Response(body, { status: 200 });
  const out = await readBoundedResponseText(res, FLUSH_EMPTY_RETRY_MAX_BYTES);
  assert.equal(out, body);
});

test("bounded read outcome tells a read failure apart from an over-cap body", async () => {
  const failing = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.error(new TypeError("terminated"));
    },
  });
  const failed = await readBoundedResponseOutcome(
    new Response(failing, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.equal(failed.kind, "error", "a stream that throws while being read is a failure");

  const big = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1)));
      controller.close();
    },
  });
  const skipped = await readBoundedResponseOutcome(
    new Response(big, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.equal(skipped.kind, "skipped", "an over-cap body is passed through, not retried");

  const body = contentFreeBody();
  const ok = await readBoundedResponseOutcome(
    new Response(body, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.deepEqual(ok, { kind: "text", text: body });

  const useful = await readBoundedResponseOutcome(
    new Response(sse(chatChunk({ content: "hi" })), { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.deepEqual(
    useful,
    { kind: "early-pass" },
    "a content turn stops at its first useful chunk"
  );
});

test("bounded read returns skipped without awaiting a tee clone cancel", async () => {
  const BUDGET_MS = 2000;
  const neverClosing = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1)));
    },
  });
  let res: Response | undefined;
  const start = Date.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    res = new Response(neverClosing, { status: 200 });
    const outcome = await Promise.race([
      readBoundedResponseOutcome(res, FLUSH_EMPTY_RETRY_MAX_BYTES),
      new Promise<never>((_, rej) => {
        timer = setTimeout(() => rej(new Error("bounded read timed out")), BUDGET_MS);
      }),
    ]);
    assert.equal(outcome.kind, "skipped");
    assert.ok(Date.now() - start < BUDGET_MS, `expected bounded skipped well under ${BUDGET_MS}ms`);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    await res?.body?.cancel().catch(() => undefined);
  }
});

test("buffered turn verdict: a dropped stream retries unless the client went away", () => {
  const dropped = { kind: "error" } as const;
  const retry = judgeBufferedTurn(dropped, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, false);
  assert.equal(retry.kind, "retry");
  const gone = judgeBufferedTurn(dropped, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, true);
  assert.equal(gone.kind, "pass", "a client that disconnected must not cost another upstream call");
  const skipped = judgeBufferedTurn(
    { kind: "skipped" },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(skipped.kind, "pass", "an unclassifiable turn passes through");
});

test("replay: Responses reasoning-only deltas without completed classify empty", () => {
  const body = [
    `data: ${JSON.stringify({ type: "response.reasoning_text.delta", delta: "thinking here" })}\n\n`,
    `data: ${JSON.stringify({ type: "response.reasoning_summary_text.done", text: "thinking here" })}\n\n`,
  ].join("");
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("a stalled stream with nothing usable is retried, not surfaced as an error", async () => {
  // An upstream that answers, sends a keepalive, then goes silent without ever
  // closing or erroring: buffering can never end on its own.
  const silent = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
    },
  });
  const started = Date.now();
  const out = await readBoundedResponseOutcome(
    new Response(silent, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50
  );
  assert.equal(out.kind, "idle", "a stream that stops producing must end the buffered read");
  assert.ok(Date.now() - started < 2000, "the read must return on its own budget");

  const verdict = judgeBufferedTurn(out, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, false);
  assert.equal(verdict.kind, "retry", "nothing usable was produced: replay, never a bare failure");

  const gone = judgeBufferedTurn(out, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, true);
  assert.equal(gone.kind, "pass", "a client that disconnected must not cost another dispatch");
});

test("a stalled stream that already carries content is passed through, not replayed", async () => {
  const partial = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(sse(chatChunk({ content: "hello" }))));
    },
  });
  const out = await readBoundedResponseOutcome(
    new Response(partial, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50
  );
  // #14691: the content chunk ends the read before the stall is ever observed.
  assert.equal(out.kind, "early-pass");
  const verdict = judgeBufferedTurn(out, FORMATS.OPENAI, FORMATS.OPENAI, false);
  assert.equal(verdict.kind, "pass", "content already produced is worth keeping");
});

test("bounded read keeps no budget when the idle budget is zero", async () => {
  const body = contentFreeBody();
  const out = await readBoundedResponseOutcome(new Response(body, { status: 200 }), 256_000, 0);
  assert.deepEqual(out, { kind: "text", text: body }, "a disabled budget must not change reads");
});

function recordingSelector(results: Record<string, unknown>) {
  const calls: Array<{ exclude: string | null; allowed: string[] | null }> = [];
  const select = async (
    _provider: string,
    excludeConnectionId: string | null,
    allowedConnections: string[] | null,
    _model: string | null
  ) => {
    calls.push({ exclude: excludeConnectionId, allowed: allowedConnections });
    return results[String(excludeConnectionId)] ?? null;
  };
  return { calls, select };
}

const unconstrained = { leased: false, forcedConnectionId: null, apiKey: null };

test("retry credentials exclude the connection that returned the empty turn", async () => {
  const { calls, select } = recordingSelector({ "conn-a": { connectionId: "conn-b" } });
  const next = await pickEmptyTurnRetryCredentials(select, {
    ...unconstrained,
    provider: "gemini",
    model: "gemini-2.5-flash",
    current: { connectionId: "conn-a" },
  });
  assert.deepEqual(next, { connectionId: "conn-b" });
  assert.deepEqual(calls, [{ exclude: "conn-a", allowed: null }]);
});

test("retry credentials fall back to the normal selection when nothing else is eligible", async () => {
  const { calls, select } = recordingSelector({
    "conn-a": { allRateLimited: true, retryAfter: "later" },
    null: { connectionId: "conn-a" },
  });
  const next = await pickEmptyTurnRetryCredentials(select, {
    ...unconstrained,
    provider: "gemini",
    model: "gemini-2.5-flash",
    current: { connectionId: "conn-a" },
  });
  assert.deepEqual(next, { connectionId: "conn-a" }, "a single slot replays itself");
  assert.deepEqual(calls, [
    { exclude: "conn-a", allowed: null },
    { exclude: null, allowed: null },
  ]);
});

test("both retry selections stay inside the key's connection allowlist", async () => {
  const { calls, select } = recordingSelector({
    "conn-a": { blockedByKeyPolicy: true, blockedCount: 1 },
    null: { connectionId: "conn-a" },
  });
  const next = await pickEmptyTurnRetryCredentials(select, {
    ...unconstrained,
    apiKey: { allowedConnections: ["conn-a", 7, " "] },
    provider: "gemini",
    model: null,
    current: { connectionId: "conn-a" },
  });
  assert.deepEqual(next, { connectionId: "conn-a" });
  assert.deepEqual(calls, [
    { exclude: "conn-a", allowed: ["conn-a"] },
    { exclude: null, allowed: ["conn-a"] },
  ]);
});

test("retry credentials are null when no selection yields a connection", async () => {
  const { calls, select } = recordingSelector({});
  const next = await pickEmptyTurnRetryCredentials(select, {
    ...unconstrained,
    provider: "gemini",
    model: null,
    current: {},
  });
  assert.equal(next, null);
  assert.deepEqual(calls, [{ exclude: null, allowed: null }], "no current connection: one pick");
  const failing = async () => {
    throw new Error("selection failed");
  };
  const afterThrow = await pickEmptyTurnRetryCredentials(failing, {
    ...unconstrained,
    provider: "gemini",
    model: null,
    current: { connectionId: "conn-a" },
  });
  assert.equal(afterThrow, null);
});

test("a lease, a pinned connection or a quota key replays without a selection", async () => {
  const cases = [
    { ...unconstrained, leased: true },
    { ...unconstrained, forcedConnectionId: "conn-a" },
    { ...unconstrained, apiKey: { allowedQuotas: ["pool-1"] } },
  ];
  for (const routing of cases) {
    const { calls, select } = recordingSelector({ "conn-a": { connectionId: "conn-b" } });
    const current = { connectionId: "conn-a" };
    const next = await pickEmptyTurnRetryCredentials(select, {
      ...routing,
      provider: "gemini",
      model: null,
      current,
    });
    assert.equal(next, current, JSON.stringify(routing));
    assert.deepEqual(calls, [], JSON.stringify(routing));
  }
});

test("the credential swap undoes overwritten and added fields in place", () => {
  const target: Record<string, unknown> = { connectionId: "conn-a", apiKey: "key-a" };
  const restore = swapCredentialsInPlace(target, {
    connectionId: "conn-b",
    apiKey: "key-b",
    projectId: "project-b",
  });
  assert.deepEqual(target, { connectionId: "conn-b", apiKey: "key-b", projectId: "project-b" });
  restore();
  assert.deepEqual(target, { connectionId: "conn-a", apiKey: "key-a" });
});

test("swapping credentials onto themselves is a no-op", () => {
  const target: Record<string, unknown> = { connectionId: "conn-a" };
  const restore = swapCredentialsInPlace(target, target);
  target.accessToken = "refreshed";
  restore();
  assert.deepEqual(target, { connectionId: "conn-a", accessToken: "refreshed" });
});
