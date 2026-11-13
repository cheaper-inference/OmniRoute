// G2 Responses usage guard: every Responses stream must be acceptable to Codex.
// Codex (codex-api/src/sse/responses.rs) rejects a terminal event whose `usage` is
// an object without integer input_tokens/output_tokens/total_tokens, and fails the
// turn when the stream has no terminal event. This table pins both contracts.
import { describe, expect, it } from "vitest";

import { createResponsesApiTransformStream } from "../responsesTransformer.ts";

const TERMINAL_TYPES = new Set(["response.completed", "response.failed", "response.incomplete"]);
const encoder = new TextEncoder();
const decoder = new TextDecoder();

type Event = { event: string; data: Record<string, unknown> };

const base = { id: "chatcmpl-g2", model: "gpt-test" };
const text = (content: string) => ({
  ...base,
  choices: [{ index: 0, delta: { content }, finish_reason: null }],
});
const finish = (reason = "stop", usage?: unknown) => ({
  ...base,
  choices: [{ index: 0, delta: {}, finish_reason: reason }],
  ...(usage !== undefined ? { usage } : {}),
});
const usageOnly = (usage: unknown) => ({ ...base, choices: [], usage });

/** Each entry is either an object (JSON-encoded) or a raw `data:` payload string. */
async function run(chunks: Array<unknown>): Promise<Event[]> {
  const stream = createResponsesApiTransformStream(null, 600000);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  let output = "";
  const reading = (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      output += decoder.decode(value, { stream: true });
    }
  })();
  for (const chunk of chunks) {
    const payload = typeof chunk === "string" ? chunk : JSON.stringify(chunk);
    await writer.write(encoder.encode(`data: ${payload}\n\n`));
  }
  await writer.close();
  await reading;

  const events: Event[] = [];
  for (const block of output.split("\n\n")) {
    const eventMatch = block.match(/^event: (.+)$/m);
    const dataMatch = block.match(/^data: (.+)$/m);
    if (!eventMatch || !dataMatch) continue;
    events.push({ event: eventMatch[1], data: JSON.parse(dataMatch[1]) });
  }
  return events;
}

function terminals(events: Event[]): Event[] {
  return events.filter((e) => TERMINAL_TYPES.has(e.event));
}

function onlyTerminal(events: Event[]): Event {
  const found = terminals(events);
  expect(found.map((e) => e.event)).toHaveLength(1);
  return found[0];
}

function isCount(value: unknown): boolean {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

/** Mirrors Codex's ResponseCompletedUsage deserializer, plus "no float anywhere". */
function expectCodexUsage(usage: unknown) {
  if (usage === null) return;
  expect(typeof usage).toBe("object");
  const record = usage as Record<string, unknown>;
  for (const key of ["input_tokens", "output_tokens", "total_tokens"]) {
    expect(isCount(record[key]), `${key}=${JSON.stringify(record[key])}`).toBe(true);
  }
  if (record.input_tokens_details != null) {
    const details = record.input_tokens_details as Record<string, unknown>;
    expect(isCount(details.cached_tokens)).toBe(true);
  }
  if (record.output_tokens_details != null) {
    const details = record.output_tokens_details as Record<string, unknown>;
    expect(isCount(details.reasoning_tokens)).toBe(true);
  }
  const walk = (value: unknown, path: string) => {
    if (typeof value === "number") {
      expect(isCount(value), `${path}=${value}`).toBe(true);
    } else if (typeof value === "string" && /^\s*-?[\d.]/.test(value)) {
      throw new Error(`usage field ${path} is a numeric string: ${value}`);
    } else if (value && typeof value === "object") {
      for (const [key, inner] of Object.entries(value)) walk(inner, `${path}.${key}`);
    }
  };
  walk(record, "usage");
}

function terminalUsage(events: Event[]): unknown {
  const terminal = onlyTerminal(events);
  const response = terminal.data.response as Record<string, unknown>;
  expect("usage" in response, "terminal response must carry usage (object or null)").toBe(true);
  expectCodexUsage(response.usage);
  return response.usage;
}

describe("G2 usage shapes on the terminal event", () => {
  it("well-formed usage is passed through unchanged", async () => {
    const events = await run([
      text("Hi"),
      finish("stop"),
      usageOnly({ prompt_tokens: 7, completion_tokens: 3, total_tokens: 10 }),
    ]);
    expect(terminalUsage(events)).toEqual({
      input_tokens: 7,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens: 3,
      output_tokens_details: { reasoning_tokens: 0 },
      total_tokens: 10,
    });
  });

  it("missing usage becomes usage: null", async () => {
    const events = await run([text("Hi"), finish("stop")]);
    expect(terminalUsage(events)).toBeNull();
  });

  it("float counts are coerced to integers", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens: 5.6, completion_tokens: 2.2, total_tokens: 7.8 }),
    ]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 6,
      output_tokens: 2,
      total_tokens: 8,
    });
  });

  it("float written as 5.0 still deserializes as an integer", async () => {
    const events = await run([
      text("Hi"),
      `{"id":"chatcmpl-g2","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":5.0,"completion_tokens":1.0,"total_tokens":6.0}}`,
    ]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 5,
      output_tokens: 1,
      total_tokens: 6,
    });
  });

  it("numeric strings are coerced to integers", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens: "12", completion_tokens: "3" }),
    ]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 12,
      output_tokens: 3,
      total_tokens: 15,
    });
  });

  it("non-finite and non-numeric counts never leak; with nothing usable usage is null", async () => {
    const events = await run([
      text("Hi"),
      `{"id":"chatcmpl-g2","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":1e999,"completion_tokens":"NaN","total_tokens":"abc"}}`,
    ]);
    expect(terminalUsage(events)).toBeNull();
  });

  it("negative counts are clamped to zero", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens: -5, completion_tokens: 3, total_tokens: -2 }),
    ]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 0,
      output_tokens: 3,
      total_tokens: 3,
    });
  });

  it("partial object without total gets a derived total", async () => {
    const events = await run([text("Hi"), finish("stop", { input_tokens: 9, output_tokens: 4 })]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 9,
      output_tokens: 4,
      total_tokens: 13,
    });
  });

  it("partial object with only one side is completed, not emitted partial", async () => {
    const events = await run([text("Hi"), finish("stop", { prompt_tokens: 5 })]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 5,
      output_tokens: 0,
      total_tokens: 5,
    });
  });

  it("details-only usage with no token counts becomes null", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens_details: { cached_tokens: 3 } }),
    ]);
    expect(terminalUsage(events)).toBeNull();
  });

  it("cache and reasoning details present (floats, strings) are integers", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", {
        prompt_tokens: 100,
        completion_tokens: 20,
        total_tokens: 120,
        prompt_tokens_details: { cached_tokens: 40.4 },
        completion_tokens_details: { reasoning_tokens: "7" },
      }),
    ]);
    expect(terminalUsage(events)).toMatchObject({
      input_tokens: 100,
      input_tokens_details: { cached_tokens: 40 },
      output_tokens: 20,
      output_tokens_details: { reasoning_tokens: 7 },
      total_tokens: 120,
    });
  });

  it("cache details absent still yields valid details", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12 }),
    ]);
    const usage = terminalUsage(events) as Record<string, unknown>;
    expect(usage.input_tokens_details).toEqual({ cached_tokens: 0 });
    expect(usage.output_tokens_details).toEqual({ reasoning_tokens: 0 });
  });

  it("Anthropic-style cache fields stay integers after context folding", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", {
        prompt_tokens: 10.5,
        completion_tokens: 2,
        cache_read_input_tokens: "4",
        cache_creation_input_tokens: 3.3,
      }),
    ]);
    terminalUsage(events);
  });
});

describe("G2 exactly one terminal event", () => {
  it("double finish_reason with usage yields one terminal", async () => {
    const usage = { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 };
    const events = await run([text("Hi"), finish("stop", usage), finish("stop", usage)]);
    expect(onlyTerminal(events).event).toBe("response.completed");
  });

  it("double finish_reason without usage yields one terminal", async () => {
    const events = await run([text("Hi"), finish("stop"), finish("stop")]);
    expect(onlyTerminal(events).event).toBe("response.completed");
  });

  it("no finish_reason from upstream still yields one terminal", async () => {
    const events = await run([text("Hi"), text(" there")]);
    expect(onlyTerminal(events).event).toBe("response.completed");
    terminalUsage(events);
  });

  it("empty upstream stream still yields one terminal", async () => {
    const events = await run([]);
    expect(onlyTerminal(events).event).toBe("response.completed");
  });

  it("[DONE] only stream still yields one terminal", async () => {
    const events = await run(["[DONE]"]);
    expect(onlyTerminal(events).event).toBe("response.completed");
  });

  it("upstream error chunk mid-stream (finish_reason error) ends in one response.failed", async () => {
    const events = await run([
      text("partial"),
      {
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: {}, finish_reason: "error" }],
        error: { message: "Upstream stream failed", type: "server_error", code: "stream_error" },
      },
      "[DONE]",
    ]);
    const terminal = onlyTerminal(events);
    expect(terminal.event).toBe("response.failed");
    const response = terminal.data.response as Record<string, unknown>;
    expect(response.status).toBe("failed");
    const error = response.error as Record<string, unknown>;
    expect(typeof error.message).toBe("string");
    expect(error.code).toBe("stream_error");
    terminalUsage(events);
  });

  it("error-only chunk with no choices ends in one response.failed", async () => {
    const events = await run([
      text("partial"),
      { error: { message: "rate limited", code: "rate_limit_exceeded" } },
    ]);
    const terminal = onlyTerminal(events);
    expect(terminal.event).toBe("response.failed");
    expect((terminal.data.response as Record<string, unknown>).error).toMatchObject({
      code: "rate_limit_exceeded",
    });
  });

  it("error after the response already completed does not add a second terminal", async () => {
    const events = await run([
      text("Hi"),
      finish("stop", { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 }),
      { error: { message: "late failure" } },
    ]);
    expect(onlyTerminal(events).event).toBe("response.completed");
  });

  it("length finish stays a single response.incomplete with valid usage", async () => {
    const events = await run([text("Hi"), finish("length", { prompt_tokens: 3.5 })]);
    expect(onlyTerminal(events).event).toBe("response.incomplete");
    terminalUsage(events);
  });
});
