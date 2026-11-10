import assert from "node:assert/strict";
import { test } from "node:test";

import {
  grokReconnectDelayMs,
  watchGrokBotTurn,
} from "../../open-sse/executors/grok-bot-watch.ts";
import type { Transport } from "../../open-sse/executors/grok-bot-protocol.ts";

test("the reconnect delay backs off and stops at a ceiling", () => {
  assert.equal(grokReconnectDelayMs(0), 0, "the first attempt reconnects at once");
  assert.equal(grokReconnectDelayMs(1), 250);
  assert.equal(grokReconnectDelayMs(2), 500);
  assert.equal(grokReconnectDelayMs(3), 1000);
  assert.equal(grokReconnectDelayMs(4), 2000);
  assert.equal(grokReconnectDelayMs(5), 4000);
  assert.equal(grokReconnectDelayMs(12), 4000, "never grows past the ceiling");
});

test("a persistently failing watch does not spin", async () => {
  // Every read fails the way a 5xx or a refused connection does. Without a
  // delay between reconnects this loops as fast as the socket fails.
  let attempts = 0;
  const transport: Transport = {
    rpc: async () => ({}),
    watch: () => {
      attempts += 1;
      return (async function* fail(): AsyncGenerator<unknown> {
        throw Object.assign(new Error("stream failed: http_503"), { errorType: "http_error" });
      })();
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1200);

  try {
    await assert.rejects(
      watchGrokBotTurn(transport, "agent", "message", controller.signal, null),
      /stream failed/
    );
  } finally {
    clearTimeout(timer);
  }

  // 250 + 500 + 1000 ms of backoff leaves room for only a handful of attempts
  // in 1.2s; an unthrottled loop reaches the hundreds.
  assert.ok(attempts > 0, "the watch must be attempted at least once");
  assert.ok(attempts <= 8, `reconnects must be spaced out, saw ${attempts} attempts`);
});
