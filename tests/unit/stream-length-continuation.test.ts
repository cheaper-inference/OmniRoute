import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LENGTH_CONTINUATION_FLAG,
  LENGTH_CONTINUATION_LIMITS,
  explicitClientOutputLimit,
  isLengthContinuationRequestEligible,
  wrapLengthContinuation,
  type LengthContinuationExecution,
  type LengthContinuationOutcome,
} from "../../open-sse/services/streamLengthContinuation.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const IDENTITY = { id: "chatcmpl-first", object: "chat.completion.chunk", created: 1, model: "m" };

function event(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function delta(content: string, extra: Record<string, unknown> = {}): string {
  return event({ ...IDENTITY, choices: [{ index: 0, delta: { content } }], ...extra });
}

function terminal(reason: string, content?: string, extra: Record<string, unknown> = {}): string {
  return event({
    ...IDENTITY,
    choices: [
      {
        index: 0,
        delta: content === undefined ? {} : { content },
        finish_reason: reason,
      },
    ],
    ...extra,
  });
}

function usageOnly(usage: Record<string, unknown>): string {
  return event({ ...IDENTITY, choices: [], usage });
}

const DONE = "data: [DONE]\n\n";

function streamOf(...parts: string[]): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index >= parts.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(parts[index++]));
    },
  });
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}

type ParsedFrames = {
  text: string;
  finishReasons: string[];
  doneCount: number;
  usageFrames: Record<string, unknown>[];
  ids: string[];
};

function parseFrames(raw: string): ParsedFrames {
  const out: ParsedFrames = { text: "", finishReasons: [], doneCount: 0, usageFrames: [], ids: [] };
  for (const block of raw.split("\n\n")) {
    const line = block.trim();
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (data === "[DONE]") {
      out.doneCount += 1;
      continue;
    }
    const json = JSON.parse(data) as {
      id?: string;
      choices?: { delta?: { content?: string }; finish_reason?: string | null }[];
      usage?: Record<string, unknown>;
    };
    if (json.id && !out.ids.includes(json.id)) out.ids.push(json.id);
    const choice = json.choices?.[0];
    if (typeof choice?.delta?.content === "string") out.text += choice.delta.content;
    if (choice?.finish_reason) out.finishReasons.push(choice.finish_reason);
    if (json.usage) out.usageFrames.push(json.usage);
  }
  return out;
}

type Harness = {
  client: string;
  frames: ParsedFrames;
  reopenCalls: number;
  reopenBodies: Record<string, unknown>[];
  reopenSignals: AbortSignal[];
  executions: LengthContinuationExecution[];
  outcomes: LengthContinuationOutcome[];
};

type HarnessInput = {
  first: string[];
  second?: string[] | null;
  body?: Record<string, unknown>;
  clientOutputLimit?: number | null;
  continuationTimeoutMs?: number;
  maxBufferedBytes?: number;
  signal?: AbortSignal;
  reopen?: (body: Record<string, unknown>, signal: AbortSignal) => Promise<ReadableStream | null>;
};

async function run(input: HarnessInput): Promise<Harness> {
  const harness: Harness = {
    client: "",
    frames: { text: "", finishReasons: [], doneCount: 0, usageFrames: [], ids: [] },
    reopenCalls: 0,
    reopenBodies: [],
    reopenSignals: [],
    executions: [],
    outcomes: [],
  };
  const wrapped = wrapLengthContinuation(
    streamOf(...input.first),
    input.body ?? { model: "m", messages: [{ role: "user", content: "hi" }], stream: true },
    {
      signal: input.signal ?? new AbortController().signal,
      continuationTimeoutMs:
        input.continuationTimeoutMs ?? LENGTH_CONTINUATION_LIMITS.continuationTimeoutMs,
      maxExtraOutputTokens: LENGTH_CONTINUATION_LIMITS.maxExtraOutputTokens,
      maxBufferedBytes: input.maxBufferedBytes ?? LENGTH_CONTINUATION_LIMITS.maxBufferedBytes,
      clientOutputLimit: input.clientOutputLimit ?? null,
      reopen:
        input.reopen ??
        (async (body, signal) => {
          harness.reopenCalls += 1;
          harness.reopenBodies.push(body);
          harness.reopenSignals.push(signal);
          return input.second ? streamOf(...input.second) : null;
        }),
      onExecution: (execution) => harness.executions.push(execution),
      onOutcome: (outcome) => harness.outcomes.push(outcome),
    }
  );
  harness.client = await readAll(wrapped);
  harness.frames = parseFrames(harness.client);
  return harness;
}

const FIRST_USAGE = { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 };
const SECOND_USAGE = { prompt_tokens: 40, completion_tokens: 5, total_tokens: 45 };
const COMBINED_USAGE = { prompt_tokens: 50, completion_tokens: 25, total_tokens: 75 };

test("holds mixed length frames and emits one final length when the extension also hits its cap", async () => {
  const result = await run({
    first: [delta("Primeiro"), terminal("length", " trecho."), usageOnly(FIRST_USAGE), DONE],
    second: [
      delta("o trecho. Segundo"),
      terminal("length", " trecho."),
      usageOnly(SECOND_USAGE),
      DONE,
    ],
  });

  assert.equal(result.reopenCalls, 1);
  assert.equal(result.frames.text, "Primeiro trecho. Segundo trecho.");
  assert.deepEqual(result.frames.finishReasons, ["length"]);
  assert.equal(result.frames.doneCount, 1);
  assert.equal(result.frames.usageFrames.length, 1);
  assert.deepEqual(result.frames.usageFrames[0], COMBINED_USAGE);
  assert.equal(result.executions.length, 2);
  assert.deepEqual(
    result.executions.map((execution) => execution.phase),
    ["initial", "continuation"]
  );
  assert.deepEqual(result.frames.ids, ["chatcmpl-first"], "identity stays the first response's");
  assert.deepEqual(result.outcomes, [{ outcome: "continued", suffixChars: 16 }]);
});

test("the continuation request prefills the delivered text and stays inside the extra-token cap", async () => {
  const result = await run({
    first: [delta("Primeiro trecho."), terminal("length"), DONE],
    second: [delta("o trecho. Fim."), terminal("stop"), DONE],
    body: {
      model: "m",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      max_tokens: 100_000,
    },
  });

  assert.equal(result.reopenCalls, 1);
  const body = result.reopenBodies[0] as { messages: { role: string; content: string }[] };
  assert.deepEqual(body.messages.at(-1), { role: "assistant", content: "Primeiro trecho." });
  assert.equal(body.max_tokens, LENGTH_CONTINUATION_LIMITS.maxExtraOutputTokens);
  assert.equal(result.frames.text, "Primeiro trecho. Fim.");
  assert.deepEqual(result.frames.finishReasons, ["stop"]);
  assert.equal(result.frames.doneCount, 1);
});

test("max_completion_tokens is the cap key when the request already used it", async () => {
  const result = await run({
    first: [delta("Primeiro trecho."), terminal("length"), DONE],
    second: [delta("o trecho. Fim."), terminal("stop"), DONE],
    body: {
      model: "m",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      max_completion_tokens: 9_000,
    },
  });
  const body = result.reopenBodies[0];
  assert.equal(body.max_completion_tokens, LENGTH_CONTINUATION_LIMITS.maxExtraOutputTokens);
  assert.equal("max_tokens" in body, false);
});

test("a stop terminal passes through byte for byte without any extra request", async () => {
  const first = [delta("Olá"), terminal("stop", " mundo"), usageOnly(FIRST_USAGE), DONE];
  const result = await run({ first, second: [delta("x"), terminal("stop"), DONE] });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
  assert.deepEqual(result.outcomes, []);
});

test("a stream cut without any terminal never continues", async () => {
  const first = [delta("Parcial sem terminal")];
  const result = await run({ first, second: [delta("x"), terminal("stop"), DONE] });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
});

test("a client limit that was consumed blocks the extra request and keeps the original frames", async () => {
  const first = [
    delta("Primeiro trecho."),
    terminal("length"),
    usageOnly({ prompt_tokens: 10, completion_tokens: 64, total_tokens: 74 }),
    DONE,
  ];
  const result = await run({
    first,
    second: [delta("o trecho. Mais"), terminal("stop"), DONE],
    clientOutputLimit: 64,
  });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
  assert.deepEqual(result.outcomes, [{ outcome: "skipped", reason: "client-limit" }]);
});

test("a client limit with unknown consumption is treated as consumed", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const result = await run({
    first,
    second: [delta("x"), terminal("stop"), DONE],
    clientOutputLimit: 4_096,
  });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
});

test("a client limit with room left shrinks the extra tokens to the remainder", async () => {
  const result = await run({
    first: [
      delta("Primeiro trecho."),
      terminal("length"),
      usageOnly({ prompt_tokens: 10, completion_tokens: 900, total_tokens: 910 }),
      DONE,
    ],
    second: [delta("o trecho. Fim."), terminal("stop"), DONE],
    clientOutputLimit: 1_000,
  });
  assert.equal(result.reopenCalls, 1);
  assert.equal(result.reopenBodies[0].max_tokens, 100);
  assert.equal(result.frames.text, "Primeiro trecho. Fim.");
});

test("an empty or invalid second stream falls back to the original length frames", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), usageOnly(FIRST_USAGE), DONE];
  for (const second of [[], ["data: not json\n\n"], null]) {
    const result = await run({ first, second });
    assert.equal(result.client, first.join(""), JSON.stringify(second));
    assert.equal(result.frames.doneCount, 1);
    assert.deepEqual(result.frames.finishReasons, ["length"]);
  }
});

test("a continuation that does not echo the delivered tail is refused as an uncertain seam", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const result = await run({
    first,
    second: [delta("Uma resposta nova e sem relação"), terminal("stop"), DONE],
  });
  assert.equal(result.reopenCalls, 1);
  assert.equal(result.client, first.join(""));
  assert.deepEqual(result.outcomes, [{ outcome: "fallback", reason: "uncertain-seam" }]);
});

test("a continuation with tool calls or a tool finish is refused", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const withToolCall = await run({
    first,
    second: [
      event({
        ...IDENTITY,
        choices: [{ index: 0, delta: { tool_calls: [{ index: 0, function: { name: "f" } }] } }],
      }),
      terminal("tool_calls"),
      DONE,
    ],
  });
  assert.equal(withToolCall.client, first.join(""));
  const withToolFinish = await run({
    first,
    second: [delta("o trecho. Fim."), terminal("tool_calls"), DONE],
  });
  assert.equal(withToolFinish.client, first.join(""));
});

test("a continuation without a terminal is refused", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const result = await run({ first, second: [delta("o trecho. Fim.")] });
  assert.equal(result.client, first.join(""));
});

test("a continuation that only repeats the delivered tail adds nothing and is refused", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const result = await run({ first, second: [delta("o trecho."), terminal("stop"), DONE] });
  assert.equal(result.client, first.join(""));
});

test("tool calls, refusals and several choices in the first turn follow the existing policy", async () => {
  const second = [delta("o trecho. Fim."), terminal("stop"), DONE];
  const toolFirst = [
    delta("Primeiro trecho."),
    event({
      ...IDENTITY,
      choices: [{ index: 0, delta: { tool_calls: [{ index: 0, function: { name: "f" } }] } }],
    }),
    terminal("length"),
    DONE,
  ];
  const refusalFirst = [
    event({ ...IDENTITY, choices: [{ index: 0, delta: { refusal: "não posso" } }] }),
    delta("Primeiro trecho."),
    terminal("length"),
    DONE,
  ];
  const twoChoices = [
    event({
      ...IDENTITY,
      choices: [
        { index: 0, delta: { content: "Primeiro trecho." } },
        { index: 1, delta: { content: "Outro" } },
      ],
    }),
    terminal("length"),
    DONE,
  ];
  for (const first of [toolFirst, refusalFirst, twoChoices]) {
    const result = await run({ first, second });
    assert.equal(result.reopenCalls, 0);
    assert.equal(result.client, first.join(""));
  }
});

test("a length with no delivered text is not continued", async () => {
  const first = [
    event({ ...IDENTITY, choices: [{ index: 0, delta: { role: "assistant" } }] }),
    terminal("length"),
    DONE,
  ];
  const result = await run({ first, second: [delta("x"), terminal("stop"), DONE] });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
});

test("retention beyond the cap releases the held frames unchanged and never reopens", async () => {
  const filler = "z".repeat(512);
  const first = [
    delta("Primeiro trecho."),
    terminal("length"),
    ...Array.from({ length: 12 }, () => `: ${filler}\n\n`),
    DONE,
  ];
  const result = await run({
    first,
    second: [delta("o trecho. Fim."), terminal("stop"), DONE],
    maxBufferedBytes: 2_048,
  });
  assert.equal(result.reopenCalls, 0);
  assert.equal(result.client, first.join(""));
  assert.deepEqual(result.outcomes, [{ outcome: "fallback", reason: "retention-cap" }]);
});

test("usage that sits in the terminal frame is combined in place and delivered once", async () => {
  const result = await run({
    first: [delta("Primeiro trecho."), terminal("length", undefined, { usage: FIRST_USAGE }), DONE],
    second: [delta("o trecho. Fim."), terminal("stop", undefined, { usage: SECOND_USAGE }), DONE],
  });
  assert.equal(result.frames.usageFrames.length, 1);
  assert.deepEqual(result.frames.usageFrames[0], COMBINED_USAGE);
  assert.equal(result.frames.doneCount, 1);
  assert.deepEqual(result.frames.finishReasons, ["stop"]);
});

test("a rejected attempt is still counted in the usage the client receives", async () => {
  const result = await run({
    first: [delta("Primeiro trecho."), terminal("length"), usageOnly(FIRST_USAGE), DONE],
    second: [
      delta("Uma resposta nova e sem relação"),
      terminal("stop"),
      usageOnly(SECOND_USAGE),
      DONE,
    ],
  });
  assert.equal(result.frames.text, "Primeiro trecho.");
  assert.deepEqual(result.frames.finishReasons, ["length"]);
  assert.equal(result.frames.usageFrames.length, 1);
  assert.deepEqual(result.frames.usageFrames[0], COMBINED_USAGE);
  assert.equal(result.executions.length, 2);
});

test("usage missing from one execution drops the partial usage so the existing estimate applies", async () => {
  const result = await run({
    first: [delta("Primeiro trecho."), terminal("length"), usageOnly(FIRST_USAGE), DONE],
    second: [delta("o trecho. Fim."), terminal("stop"), DONE],
  });
  assert.equal(result.frames.text, "Primeiro trecho. Fim.");
  assert.equal(result.frames.usageFrames.length, 0);
  assert.equal(result.frames.doneCount, 1);
});

test("a client abort while the extension is pending aborts its signal and ends the stream", async () => {
  const controller = new AbortController();
  let reopenSignal: AbortSignal | undefined;
  const wrapped = wrapLengthContinuation(
    streamOf(delta("Primeiro trecho."), terminal("length"), DONE),
    { model: "m", messages: [{ role: "user", content: "hi" }], stream: true },
    {
      signal: controller.signal,
      continuationTimeoutMs: 30_000,
      maxExtraOutputTokens: 2_048,
      maxBufferedBytes: 65_536,
      clientOutputLimit: null,
      reopen: (_body, signal) => {
        reopenSignal = signal;
        return new Promise(() => {}); // never answers: only the abort can end it
      },
    }
  );
  const reader = wrapped.getReader();
  const pending = reader.read();
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.ok(reopenSignal, "the extension request was opened");
  controller.abort();
  await reader.cancel("client left");
  assert.equal(reopenSignal!.aborted, true);
  const settled = await Promise.race([
    pending.then(() => "settled"),
    new Promise((resolve) => setTimeout(() => resolve("hung"), 500)),
  ]);
  assert.equal(settled, "settled");
});

test("the extension deadline ends a stalled second stream and keeps the original length", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  let cancelled = false;
  const result = await run({
    first,
    continuationTimeoutMs: 40,
    reopen: async () =>
      new ReadableStream<Uint8Array>({
        pull() {
          return new Promise(() => {});
        },
        cancel() {
          cancelled = true;
        },
      }),
  });
  assert.equal(result.client, first.join(""));
  assert.equal(cancelled, true, "the stalled reader is released");
  assert.deepEqual(result.outcomes, [{ outcome: "fallback", reason: "timeout" }]);
});

test("a throwing reopen keeps the original length frames", async () => {
  const first = [delta("Primeiro trecho."), terminal("length"), DONE];
  const result = await run({
    first,
    reopen: async () => {
      throw new Error("upstream exploded");
    },
  });
  assert.equal(result.client, first.join(""));
});

test("a read error before the length keeps the existing error behavior", async () => {
  const failing = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(delta("Parcial")));
    },
    pull() {
      throw new Error("socket reset");
    },
  });
  const wrapped = wrapLengthContinuation(
    failing,
    { model: "m", messages: [{ role: "user", content: "hi" }] },
    {
      signal: new AbortController().signal,
      continuationTimeoutMs: 30_000,
      maxExtraOutputTokens: 2_048,
      maxBufferedBytes: 65_536,
      clientOutputLimit: null,
      reopen: async () => null,
    }
  );
  await assert.rejects(readAll(wrapped), /socket reset/);
});

test("a client cancel releases the upstream reader exactly once", async () => {
  let cancelCalls = 0;
  const upstream = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.enqueue(encoder.encode(delta("x")));
    },
    cancel() {
      cancelCalls += 1;
    },
  });
  const wrapped = wrapLengthContinuation(
    upstream,
    { model: "m", messages: [{ role: "user", content: "hi" }] },
    {
      signal: new AbortController().signal,
      continuationTimeoutMs: 30_000,
      maxExtraOutputTokens: 2_048,
      maxBufferedBytes: 65_536,
      clientOutputLimit: null,
      reopen: async () => null,
    }
  );
  const reader = wrapped.getReader();
  await reader.read();
  await reader.cancel("done");
  await reader.cancel("again").catch(() => {});
  assert.equal(cancelCalls, 1);
});

test("request eligibility: one choice, plain chat body, no linked session", () => {
  const ok = { model: "m", messages: [{ role: "user", content: "hi" }] };
  assert.equal(isLengthContinuationRequestEligible(ok, ok), true);
  assert.equal(isLengthContinuationRequestEligible({ ...ok, n: 2 }, ok), false);
  assert.equal(isLengthContinuationRequestEligible(ok, { ...ok, n: 3 }), false);
  assert.equal(
    isLengthContinuationRequestEligible(ok, { ...ok, previous_response_id: "r1" }),
    false
  );
  assert.equal(isLengthContinuationRequestEligible(ok, { ...ok, audio: { voice: "x" } }), false);
  assert.equal(isLengthContinuationRequestEligible(ok, { model: "m", messages: [] }), false);
  assert.equal(isLengthContinuationRequestEligible(ok, { model: "m", input: [] }), false);
});

test("explicitClientOutputLimit reads only what the client itself set", () => {
  assert.equal(explicitClientOutputLimit({ messages: [] }), null);
  assert.equal(explicitClientOutputLimit({ max_tokens: 256 }), 256);
  assert.equal(explicitClientOutputLimit({ max_completion_tokens: 512, max_tokens: 1024 }), 512);
  assert.equal(explicitClientOutputLimit({ max_output_tokens: 300 }), 300);
  assert.equal(explicitClientOutputLimit({ max_tokens: 0 }), null);
  assert.equal(explicitClientOutputLimit({ max_tokens: "x" }), null);
});

test("the flag is a registered opt-in that is off by default", () => {
  const definition = FEATURE_FLAG_DEFINITIONS.find((flag) => flag.key === LENGTH_CONTINUATION_FLAG);
  assert.ok(definition, "STREAM_LENGTH_CONTINUATION_ENABLED is registered");
  assert.equal(definition!.defaultValue, "false");
  assert.equal(definition!.type, "boolean");
});
