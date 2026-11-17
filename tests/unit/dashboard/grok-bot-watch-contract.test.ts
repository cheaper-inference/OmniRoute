import test from "node:test";
import assert from "node:assert/strict";

import {
  grokBotAfter,
  grokBotGeneration,
} from "../../../src/app/(dashboard)/dashboard/grok-bot/query.ts";
import { watchStream } from "../../../src/app/(dashboard)/dashboard/grok-bot/watchStream.ts";

test("the watch cursor accepts only canonical uint64 decimal values", () => {
  for (const value of ["0", "1", "42", "18446744073709551615"]) {
    assert.equal(grokBotAfter(value), value);
  }
  for (const value of [
    "",
    "-1",
    "+1",
    "01",
    "1.0",
    "1e3",
    " 1",
    "1 ",
    "18446744073709551616",
    "123456789012345678901",
  ]) {
    assert.equal(grokBotAfter(value), null, value);
  }
});

test("the watch generation is a bounded safe integer", () => {
  assert.equal(grokBotGeneration(null), null);
  assert.equal(grokBotGeneration(""), null);
  assert.equal(grokBotGeneration("0"), 0);
  assert.equal(grokBotGeneration("9"), 9);
  assert.equal(grokBotGeneration("9007199254740991"), 9_007_199_254_740_991);
  for (const value of ["-1", "01", "1.0", "9007199254740992"]) {
    assert.equal(grokBotGeneration(value), null, value);
  }
});

test("the watch request sets the bounded inline body threshold", async () => {
  let payload: Record<string, unknown> | null = null;
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent",
    after: "7",
    generation: 0,
    signal: new AbortController().signal,
    release: () => {},
    frames: (input) => {
      payload = input.payload;
      return {
        async *[Symbol.asyncIterator]() {
          // No frames are needed for this request-shape assertion.
        },
      };
    },
  });
  await new Response(stream).text();
  assert.equal(payload?.inlineBodyMaxBytes, 65_536);
  const cursor = (payload?.cursors as Array<Record<string, unknown>>)[0];
  assert.equal(cursor.afterUpdatedSeq, "7");
});

test("the first watch sends cursor zero", async () => {
  let payload: Record<string, unknown> | null = null;
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent",
    after: "0",
    generation: 0,
    signal: new AbortController().signal,
    release: () => {},
    frames: (input) => {
      payload = input.payload;
      return {
        async *[Symbol.asyncIterator]() {
          // No frames are needed for this request-shape assertion.
        },
      };
    },
  });
  await new Response(stream).text();
  const cursor = (payload?.cursors as Array<Record<string, unknown>>)[0];
  assert.equal(cursor.afterUpdatedSeq, "0");
});
