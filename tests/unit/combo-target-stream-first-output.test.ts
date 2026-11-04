import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildTargetTimeoutRunner,
  resolveFirstOutputWaitMs,
} from "../../open-sse/services/combo/targetTimeoutRunner.ts";
import {
  DECLARED_FIRST_OUTPUT_WAIT_CAP_MS,
  resolveComboSetupConfig,
} from "../../open-sse/services/comboConfig.ts";
import {
  awaitFirstOutput,
  SseOutputScanner,
} from "../../open-sse/services/combo/firstOutputStream.ts";
import { OPENAI_RESPONSES_IN_PROGRESS_FRAME } from "../../open-sse/utils/sseHeartbeat.ts";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";
import { resolveDeclaredTargetBudgetMs } from "../../open-sse/services/combo.ts";
import { GLM_TIMEOUT_MS } from "../../open-sse/config/glmProvider.ts";
import { codexProvider } from "../../open-sse/config/providers/registry/codex/index.ts";
import type { ComboLogger } from "../../open-sse/services/combo/types.ts";

const noopLog: ComboLogger = { warn() {}, info() {}, error() {}, debug() {} };

const enc = new TextEncoder();

function frame(delta: Record<string, unknown>) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta, finish_reason: null }],
  })}\n\n`;
}

/**
 * SSE body that emits the given frames, then either closes or stalls forever. `cancelled` flips
 * when the target is torn down, either through the target's abort signal or a cancel.
 */
function sseBody(
  frames: (string | Uint8Array)[],
  opts: { stall?: boolean; cancelled?: () => void; signal?: AbortSignal | null } = {}
) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const f of frames) controller.enqueue(typeof f === "string" ? enc.encode(f) : f);
      if (!opts.stall) controller.close();
      opts.signal?.addEventListener(
        "abort",
        () => {
          opts.cancelled?.();
          controller.error(new Error("aborted"));
        },
        { once: true }
      );
    },
    cancel() {
      opts.cancelled?.();
    },
  });
}

function sseResponse(body: ReadableStream<Uint8Array>, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/event-stream" },
  });
}

test("a streaming target that never produces output is abandoned within the per-target budget", async () => {
  let cancelled = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () =>
      sseResponse(
        sseBody([": keepalive\n\n"], { stall: true, cancelled: () => (cancelled = true) })
      ),
    comboTargetTimeoutMs: 80,
    log: noopLog,
  });

  const started = Date.now();
  const res = await runner({}, "stalled-model");

  assert.equal(res.status, 504, "a silent stream must fail over, not hold the combo");
  const body = await res.json();
  assert.equal(body?.error?.code, "combo_target_timeout");
  assert.match(res.headers.get("content-type") ?? "", /json/);
  assert.ok(Date.now() - started < 2000, "failover must land near the budget");
  assert.equal(cancelled, true, "the stalled upstream stream must be released");
});

test("the gateway's own Responses heartbeat is not output", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () =>
      sseResponse(sseBody([OPENAI_RESPONSES_IN_PROGRESS_FRAME], { stall: true })),
    comboTargetTimeoutMs: 120,
    log: noopLog,
  });

  const res = await runner({}, "responses-model");
  assert.equal(res.status, 504, "a keepalive frame says nothing about the answer");
});

test("an event: progress tick is not output", async () => {
  const progress = 'event: progress\ndata: {"tokens_generated":0,"elapsed_ms":2000}\n\n';
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([progress], { stall: true })),
    comboTargetTimeoutMs: 120,
    log: noopLog,
  });

  const res = await runner({}, "progress-model");
  assert.equal(res.status, 504);
});

test("a streaming target that emits output right away is passed through byte for byte", async () => {
  const frames = [
    frame({ role: "assistant" }),
    frame({ content: "hello" }),
    frame({ content: " world" }),
    "data: [DONE]\n\n",
  ];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames)),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "fast-model");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), frames.join(""));
});

test("keepalive comments ahead of the first token are replayed, not swallowed", async () => {
  const frames = [": keepalive\n\n", frame({ content: "hi" }), "data: [DONE]\n\n"];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames)),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "slow-first-token");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), frames.join(""));
});

test("a tool call without any text still counts as the target producing output", async () => {
  const frames = [
    frame({
      tool_calls: [
        { index: 0, id: "call_1", type: "function", function: { name: "run", arguments: "" } },
      ],
    }),
    frame({ tool_calls: [{ index: 0, function: { arguments: '{"command":"echo hi"}' } }] }),
    "data: [DONE]\n\n",
  ];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames)),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "tool-model");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), frames.join(""));
});

test("a refusal delta counts as output, matching the shared predicate", async () => {
  const frames = [frame({ refusal: "I cannot help with that" })];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "refusal-model");
  assert.equal(res.status, 200, "a refusal is the model answering, not silence");
});

test("a Responses-protocol reasoning delta counts as output", async () => {
  const frames = ['data: {"type":"response.reasoning_text.delta","delta":"thinking"}\n\n'];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "codex-model");
  assert.equal(res.status, 200);
});

test("a Messages-protocol content block delta counts as output", async () => {
  const frames = [
    'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hi"}}\n\n',
  ];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "claude-model");
  assert.equal(res.status, 200);
});

test("heartbeat-only frames do not end the guard", async () => {
  const frames = ['data: {"type":"ping"}\n\n', 'data: {"choices":[{"index":0,"delta":{}}]}\n\n'];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 120,
    log: noopLog,
  });

  const res = await runner({}, "heartbeat-model");
  assert.equal(res.status, 504, "a stream that only sends heartbeats is still silent");
});

test("a message_start-only stream is a heartbeat, not output", async () => {
  const frames = ['data: {"type":"message_start","message":{"id":"m1"}}\n\n'];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 120,
    log: noopLog,
  });

  const res = await runner({}, "messages-model");
  assert.equal(res.status, 504, "message_start says nothing about the answer yet");
});

test("a body that closes before any output is left to the empty-response path", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([])),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "empty-model");
  assert.equal(res.status, 200, "an empty stream is not a per-target timeout");
});

test("an answer that arrives without a trailing blank line is not thrown away", async () => {
  const unTerminated = 'data: {"choices":[{"delta":{"content":"hello"}}]}\n';
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([unTerminated])),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "unterminated-model");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), unTerminated);
});

test("an event split across several data lines is still recognised as output", async () => {
  const frames = ['data: {"type":"response.output_text.delta",\ndata: "delta":"hi"}\n\n'];
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody(frames, { stall: true })),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "multi-line-model");
  assert.equal(res.status, 200);
});

test("the scanner joins the data lines of one event before deciding", async () => {
  const scanner = new SseOutputScanner();
  assert.equal(scanner.push('data: {"type":"response.output_text.delta",\n'), false);
  assert.equal(scanner.push('data: "delta":"hi"}\n\n'), true);
});

test("bare CR line endings are read as line breaks", async () => {
  const scanner = new SseOutputScanner();
  assert.equal(scanner.push('data: {"choices":[{"delta":{"content":"hi"}}]}\r'), false);
  assert.equal(scanner.push("\r"), true);
});

test("a CRLF split across chunks is one line break, not two", async () => {
  const scanner = new SseOutputScanner();
  assert.equal(scanner.push('data: {"choices":[{"delta":{"content":"hi"}}]}\r'), false);
  assert.equal(scanner.push("\n\r\n"), true);
});

test("an unterminated flood releases the gate instead of buffering forever", async () => {
  const scanner = new SseOutputScanner();
  assert.equal(scanner.push("x".repeat(70 * 1024)), false);
  assert.equal(scanner.overflowedWithoutOutput(), true);
});

test("a non-2xx streaming response keeps its status", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([], { stall: true }), 429),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "rate-limited-model");
  assert.equal(res.status, 429, "a rate limit keeps its meaning instead of becoming a 504");
});

test("the gate budget is what the dispatch left over", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return sseResponse(sseBody([], { stall: true }));
    },
    comboTargetTimeoutMs: 1000,
    log: noopLog,
  });

  const started = Date.now();
  const res = await runner({}, "slow-dispatch-model");
  const elapsed = Date.now() - started;

  assert.equal(res.status, 504);
  // 600ms of dispatch plus the ~400ms left over; a second full 1000ms budget would overshoot.
  assert.ok(elapsed < 1300, `expected the leftover budget to bound the wait, took ${elapsed}ms`);
  assert.ok(
    elapsed > 800,
    `expected the wait to actually use the leftover budget, took ${elapsed}ms`
  );
});

test("a parent hedge abort during the first-output wait is not a timeout", async () => {
  const parent = new AbortController();
  let cancelled = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async (_b, _m, target) =>
      sseResponse(
        sseBody([], {
          stall: true,
          cancelled: () => (cancelled = true),
          signal: target?.modelAbortSignal ?? null,
        })
      ),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const started = Date.now();
  const pending = runner({}, "hedged-model", { modelAbortSignal: parent.signal });
  setTimeout(() => parent.abort(), 60);
  const res = await pending;

  assert.notEqual(res.status, 504, "losing a hedge race must not be charged as a timeout");
  assert.equal(cancelled, true, "the hedge cancel must reach the target body");
  assert.ok(Date.now() - started < 2000, "the cancel must not wait for the full budget");
});

test("the gate gives up as soon as its signal aborts", async () => {
  const controller = new AbortController();
  const started = Date.now();
  const pending = awaitFirstOutput(
    sseResponse(sseBody([], { stall: true })),
    5000,
    controller.signal
  );
  setTimeout(() => controller.abort(), 40);
  const result = await pending;

  assert.equal(result.kind, "stalled");
  assert.equal(result.kind === "stalled" ? result.reason : "", "cancelled");
  assert.ok(Date.now() - started < 2000, "the abort must not wait for the full budget");
});

test("a non-streaming response is untouched", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const res = await runner({}, "json-model");
  assert.equal(res.status, 200);
  assert.equal((await res.json())?.choices?.[0]?.message?.content, "ok");
});

// ── Body integrity: the gate must hand back an untouched body unless it is failing the target ──

function sseFramesResponse(frames: string[]) {
  return sseResponse(sseBody(frames));
}

const CLAUDE_EMPTY_TURN = [
  'event: message_start\ndata: {"type":"message_start","message":{"id":"m","role":"assistant","content":[]}}\n\n',
  'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":0}}\n\n',
  'event: message_stop\ndata: {"type":"message_stop"}\n\n',
];
const OPENAI_ROLE_ONLY_TURN = [frame({ role: "assistant" }), "data: [DONE]\n\n"];
const RESPONSES_EMPTY_COMPLETED = [
  'event: response.created\ndata: {"type":"response.created","response":{"id":"r","status":"in_progress","output":[]}}\n\n',
  'event: response.completed\ndata: {"type":"response.completed","response":{"id":"r","status":"completed","output":[]}}\n\n',
];

for (const [label, frames, trusted] of [
  ["a trusted empty Claude turn", CLAUDE_EMPTY_TURN, true],
  ["a trusted role-only OpenAI turn", OPENAI_ROLE_ONLY_TURN, true],
  ["an untrusted empty Responses completion", RESPONSES_EMPTY_COMPLETED, false],
] as const) {
  test(`${label} keeps its body and its quality verdict through the gate`, async () => {
    const direct = await validateResponseQuality(
      sseFramesResponse([...frames]),
      true,
      noopLog,
      null,
      null,
      trusted
    );
    assert.equal(direct.valid, true, "precondition: valid without the gate");

    const runner = buildTargetTimeoutRunner({
      handleSingleModel: async () => sseFramesResponse([...frames]),
      comboTargetTimeoutMs: 5000,
      log: noopLog,
    });
    const res = await runner({}, "empty-turn-model");

    assert.equal(res.status, 200);
    assert.equal(res.bodyUsed, false, "an empty stream is not the gate's to consume");
    // Same order as executeTargetAttempt: clone for the quality check, keep the original.
    const qualityClone = res.clone();
    const viaGate = await validateResponseQuality(qualityClone, true, noopLog, null, null, trusted);
    assert.equal(viaGate.valid, direct.valid, "the gate must not change the quality verdict");
    assert.equal(await res.text(), frames.join(""), "the client still gets every byte");
  });
}

test("a hedge cancel hands the body back unread and lets the target signal release upstream", async () => {
  const parent = new AbortController();
  let upstreamAborted = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async (_b, _m, target) => {
      target?.modelAbortSignal?.addEventListener("abort", () => (upstreamAborted = true), {
        once: true,
      });
      return sseResponse(sseBody([], { stall: true }));
    },
    comboTargetTimeoutMs: 5000,
    log: noopLog,
  });

  const pending = runner({}, "hedged-model", { modelAbortSignal: parent.signal });
  setTimeout(() => parent.abort(), 40);
  const res = await pending;

  assert.equal(res.status, 200);
  assert.equal(res.bodyUsed, false, "the gate must not cancel a body it is not failing");
  assert.equal(upstreamAborted, true, "the target's abort signal carries the release");
  await res.body?.cancel();
});

test("a budget stall still releases the original body", async () => {
  let cancelled = false;
  const result = await awaitFirstOutput(
    sseResponse(sseBody([], { stall: true, cancelled: () => (cancelled = true) })),
    50
  );
  assert.equal(result.kind === "stalled" ? result.reason : "", "budget");
  // Cancelling one tee branch only reaches the source once both are cancelled.
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(cancelled, true);
});

// ── Declared target budgets only ever lengthen the first-output wait ──

test("a declared target budget lengthens the first-output wait past the dispatch budget", async () => {
  let declaredFor: unknown;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([], { stall: true })),
    comboTargetTimeoutMs: 300,
    resolveDeclaredTargetBudgetMs: (target) => {
      declaredFor = target;
      return 900;
    },
    log: noopLog,
  });

  const target = { modelAbortSignal: new AbortController().signal };
  const started = Date.now();
  const res = await runner({}, "slow-reasoning-model", target);
  const elapsed = Date.now() - started;

  assert.equal(res.status, 504);
  assert.equal(declaredFor, target);
  assert.ok(elapsed >= 800, `expected the declared 900ms to bound the wait, took ${elapsed}ms`);
});

test("a declared target budget shorter than the dispatch budget does not tighten the wait", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => sseResponse(sseBody([], { stall: true })),
    comboTargetTimeoutMs: 600,
    resolveDeclaredTargetBudgetMs: () => 50,
    log: noopLog,
  });

  const started = Date.now();
  const res = await runner({}, "short-declared-model");
  const elapsed = Date.now() - started;

  assert.equal(res.status, 504);
  assert.ok(elapsed >= 500, `a 50ms declared budget must not cut a 600ms wait, took ${elapsed}ms`);
});

test("declared target budgets resolve model, then provider, and defer to an explicit combo budget", async () => {
  const codexModel = codexProvider.models.find((model) => typeof model.timeoutMs === "number");
  assert.ok(codexModel, "precondition: the registry declares a per-model codex budget");
  const target = (provider: string, model: string) => ({
    kind: "model" as const,
    stepId: "s",
    executionKey: "k",
    modelStr: `${provider}/${model}`,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  });

  assert.equal(
    await resolveDeclaredTargetBudgetMs({}, target("codex", codexModel.id)),
    codexModel.timeoutMs
  );
  assert.equal(await resolveDeclaredTargetBudgetMs({}, target("glm", "glm-4.6")), GLM_TIMEOUT_MS);
  assert.equal(await resolveDeclaredTargetBudgetMs({}, target("openai", "gpt-4o")), undefined);
  assert.equal(
    await resolveDeclaredTargetBudgetMs({ targetTimeoutMs: 30_000 }, target("glm", "glm-4.6")),
    undefined,
    "an explicit per-combo targetTimeoutMs stays authoritative"
  );
});

test("a declared budget stretches the first-output wait by at most 180 seconds", () => {
  assert.equal(DECLARED_FIRST_OUTPUT_WAIT_CAP_MS, 180_000);
  assert.equal(resolveFirstOutputWaitMs(120_000, GLM_TIMEOUT_MS), 180_000, "GLM's 50 minutes");
  assert.equal(resolveFirstOutputWaitMs(120_000, 1_200_000), 180_000, "Codex xhigh's 20 minutes");
  assert.equal(
    resolveFirstOutputWaitMs(120_000, 150_000),
    150_000,
    "under the cap it applies as is"
  );
  assert.equal(resolveFirstOutputWaitMs(120_000, 60_000), 120_000, "never shorter than the floor");
  assert.equal(resolveFirstOutputWaitMs(120_000, undefined), 120_000);
  assert.equal(resolveFirstOutputWaitMs(120_000, Number.NaN), 120_000);
  assert.equal(
    resolveFirstOutputWaitMs(300_000, GLM_TIMEOUT_MS),
    300_000,
    "the cap never lowers a floor that is already longer"
  );
});

test("a global comboDefaults targetTimeoutMs counts as explicit; a provider override does not reach the combo setup", async () => {
  const glmTarget = {
    kind: "model" as const,
    stepId: "s",
    executionKey: "k",
    modelStr: "glm/glm-4.6",
    provider: "glm",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
  const combo = { config: {} };
  assert.equal(
    await resolveDeclaredTargetBudgetMs(
      resolveComboSetupConfig(combo, { comboDefaults: { targetTimeoutMs: 30_000 } }),
      glmTarget
    ),
    undefined,
    "an operator's global default is as authoritative as the combo's own value"
  );
  assert.equal(
    await resolveDeclaredTargetBudgetMs(
      resolveComboSetupConfig(combo, { providerOverrides: { glm: { targetTimeoutMs: 30_000 } } }),
      glmTarget
    ),
    GLM_TIMEOUT_MS,
    "the combo setup resolves the cascade without a provider, so providerOverrides are not merged"
  );
});
