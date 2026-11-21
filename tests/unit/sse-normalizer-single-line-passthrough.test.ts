import test from "node:test";
import assert from "node:assert/strict";

const { createSSEDataLineNormalizer } = await import("../../open-sse/utils/streamHelpers.ts");

function run(lines: string[]): string[] {
  return createSSEDataLineNormalizer().normalize(lines);
}

function countJsonCalls(fn: () => void): { parse: number; stringify: number } {
  const parse = JSON.parse;
  const stringify = JSON.stringify;
  const counts = { parse: 0, stringify: 0 };
  JSON.parse = ((...args: Parameters<typeof JSON.parse>) => {
    counts.parse += 1;
    return parse(...args);
  }) as typeof JSON.parse;
  JSON.stringify = ((...args: Parameters<typeof JSON.stringify>) => {
    counts.stringify += 1;
    return (stringify as (...a: unknown[]) => string)(...args);
  }) as typeof JSON.stringify;
  try {
    fn();
  } finally {
    JSON.parse = parse;
    JSON.stringify = stringify;
  }
  return counts;
}

test("a one-line data event is forwarded without a JSON round trip", () => {
  const line = 'data: {"id": "a", "choices": [{"delta": {"content": "hi"}}], "n": 1.0}';
  let out: string[] = [];
  const counts = countJsonCalls(() => {
    out = run([line, ""]);
  });
  assert.deepEqual(out, [line, ""]);
  assert.deepEqual(counts, { parse: 0, stringify: 0 });
});

test("event, id and comment lines still pass through around a one-line data event", () => {
  const data = 'data: {"type": "response.created"}';
  assert.deepEqual(run(["event: response.created", "id: 7", ": ping", data, ""]), [
    "event: response.created",
    "id: 7",
    ": ping",
    data,
    "",
  ]);
});

test("a one-line [DONE] event stays [DONE]", () => {
  assert.deepEqual(run(["data: [DONE]", ""]), ["data: [DONE]", ""]);
});

test("a one-line event with invalid JSON is forwarded unchanged", () => {
  assert.deepEqual(run(["data: {not json", ""]), ["data: {not json", ""]);
});

test("a one-line data event keeps its own bytes and gets the canonical space", () => {
  assert.deepEqual(run(['data:{"a": 1.0}', ""]), ['data: {"a": 1.0}', ""]);
});

test("a data line behind terminal escape codes is still cleaned", () => {
  assert.deepEqual(run(['\u001b[2K\u001b[1Adata: {"a":1}', ""]), ['data: {"a":1}', ""]);
});

test("a CRLF one-line data event is still cleaned", () => {
  assert.deepEqual(run(['data: {"a":1}\r', "\r"]), ['data: {"a":1}', ""]);
});

test("multi-line data still joins into one compact JSON line", () => {
  assert.deepEqual(run(['data: {"type": "response.completed",', 'data: "n": 1}', ""]), [
    'data: {"type":"response.completed","n":1}',
    "",
  ]);
});

test("a data event with no blank separator is still split at the next field line", () => {
  const first = 'data: {"id": "a", "object": "chat.completion.chunk"}';
  assert.deepEqual(run([first, "event: next", 'data: {"type": "x"}', ""]), [
    first,
    "",
    "event: next",
    'data: {"type": "x"}',
    "",
  ]);
});
